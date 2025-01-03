package com.info404.backend.api.rankings;

import com.info404.backend.api.OrderByColumn;

public enum RankingOrderByColumn implements OrderByColumn{
        ranking("ranking");
    
        private final String rankingOrderByColumn;
    
        private RankingOrderByColumn(String rankingOrderByColumn){
            this.rankingOrderByColumn=rankingOrderByColumn;
        }
        @Override
        public String toString(){
            return this.rankingOrderByColumn;
        }
}
