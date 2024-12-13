CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    publishedyear INT,
    description TEXT NOT NULL,
    url TEXT
);

CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    genre TEXT,
    releaseyear INT,
    description TEXT NOT NULL,
    url TEXT
);

CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mediaType TEXT NOT NULL CHECK (mediaType IN ('book', 'movie')),
    mediaId UUID NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (userId, mediaType, mediaId)
);

CREATE TABLE rankings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mediaType TEXT NOT NULL CHECK (mediaType IN ('book', 'movie')),
    mediaId UUID NOT NULL,
    ranking INT CHECK (ranking BETWEEN 1 AND 5),
    ranked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (userId, mediaType, mediaId)
);

CREATE TABLE adminActions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adminId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    actionInfo TEXT,
    actionTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



