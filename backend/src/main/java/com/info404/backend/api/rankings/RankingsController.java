package com.info404.backend.api.rankings;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.info404.backend.api.ApiRequest;
import com.info404.backend.api.OrderByDirection;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/rankings")
public class RankingsController {
    @Autowired
    private RankingsService rankingsService;

    @GetMapping("all/{userId}")
    public List<Rankings> getRankingByUserId(
            @PathVariable("userId") UUID userId,
            @RequestParam(name = "orderByColumn", required = false) RankingOrderByColumn rankingOrderByColumn,
            @RequestParam(name = "orderByDirection", required = false) OrderByDirection orderByDirection) {

        ApiRequest apiRequest = new ApiRequest();
        apiRequest.setOrderByColumn(rankingOrderByColumn);
        apiRequest.setOrderByDirection(orderByDirection);

        return rankingsService.getRankingByUserId(userId, apiRequest);
    }

    @PostMapping("/{userId}/addRanking")
    public void addToCart(@PathVariable("userId") @Valid UUID userId, @RequestBody Map<String, Object> requestBody) {
        UUID mediaId = UUID.fromString((String) requestBody.get("mediaId"));
        String mediaType = (String) requestBody.get("mediaType");
        Integer rating = (Integer) requestBody.get("ranking");

        if (!mediaType.equals("book") && !mediaType.equals("movie")) {
            throw new IllegalArgumentException("Invalid mediaType: must be 'book' or 'movie'");
        }

        this.rankingsService.addRankingEntry(userId, mediaId, mediaType, rating);
    }

    @DeleteMapping("/{userId}/{mediaId}")
    public void removeRankingEntry(
            @PathVariable("userId") UUID userId,
            @PathVariable("mediaId") UUID mediaId) {
        this.rankingsService.removeRankingEntry(userId, mediaId);
    }

    @PutMapping("{id}")
    public void updateRankingEntry(@PathVariable("id") UUID id, @RequestBody Map<String, Object> requestBody) {
        System.out.println("Request Body: " + requestBody);

        UUID userId = UUID.fromString((String) requestBody.get("userId"));
        UUID mediaId = UUID.fromString((String) requestBody.get("mediaId"));
        String mediaType = (String) requestBody.get("mediaType");
        Integer ranking = (Integer) requestBody.get("ranking");

        System.out.println("Ranking received: " + ranking); // Log the ranking value received

        if (!mediaType.equals("book") && !mediaType.equals("movie")) {
            throw new IllegalArgumentException("Invalid mediaType: must be 'book' or 'movie'");
        }

        Rankings rankingObj = new Rankings();
        rankingObj.setId(id);
        rankingObj.setUserId(userId);
        rankingObj.setMediaId(mediaId);
        rankingObj.setMediaType(mediaType);
        rankingObj.setRanking(ranking);

        this.rankingsService.updateRankingEntry(rankingObj);
    }

    @GetMapping("{mediaId}")
    public List<Rankings> getRankingByMediaId(@PathVariable("mediaId") UUID mediaId) {
        return this.rankingsService.getRankingByMediaId(mediaId);
    }

    @GetMapping("{userId}/{mediaId}")
    public Rankings getRankingByUserIdAndMediaId(
            @PathVariable("userId") UUID userId,
            @PathVariable("mediaId") UUID mediaId) {
        return this.rankingsService.getRankingByUserIdAndMediaId(userId, mediaId);
    }

}
