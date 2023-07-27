-- CREATE DATABASE capsule_project;
USE capsule_project;

-- Create a table for shirts
CREATE TABLE IF NOT EXISTS shirts (
    shirt_id int PRIMARY KEY AUTO_INCREMENT,
    shirt_name varchar(255) NOT NULL,
    shirt_img varchar(1024) NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW()
) ENGINE=INNODB;

INSERT INTO shirts (shirt_name, shirt_img)
VALUES
("gray baby tee", 'https://www.aritzia.com/us/en/product/baker-sculpt-knit-tank/106688.html?dwvar_106688_color=1274'), 
("cream baby tee", 'https://www.aritzia.com/us/en/product/baker-sculpt-knit-tank/106688.html?dwvar_106688_color=1274');

-- Create a table for botoms
CREATE TABLE IF NOT EXISTS bottoms (
    bottom_id int PRIMARY KEY AUTO_INCREMENT,
    bottom_name varchar(255) NOT NULL,
    bottom_img varchar(1024) NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW()
) ENGINE=INNODB;

INSERT INTO bottoms (bottom_name, bottom_img)
VALUES
("light blue straight jeans", 'https://www.aritzia.com/us/en/product/the-arlo-hi-rise-straight-jean/109070.html?dwvar_109070_color=25608_1'), 
("black wide-leg trousers", 'https://www.aritzia.com/us/en/product/the-effortless-pant%E2%84%A2/96000.html?dwvar_96000_color=1274_1');

-- Create a table for ratings
CREATE TABLE IF NOT EXISTS ratings (
    rating_id int PRIMARY KEY AUTO_INCREMENT,
    shirt_id int NOT NULL,
    INDEX shirt_ind (shirt_id),
    FOREIGN KEY (shirt_id)
        REFERENCES shirts(shirt_id),
    bottom_id int NOT NULL,
    INDEX bottom_ind (bottom_id),
    FOREIGN KEY (bottom_id)
        REFERENCES bottoms(bottom_id),
    rating int NOT NULL,    
    created TIMESTAMP NOT NULL DEFAULT NOW()
) ENGINE=INNODB;

INSERT INTO ratings (shirt_id, bottom_id, rating)
    VALUES (
        (SELECT shirt_id FROM shirts WHERE shirt_name = "gray baby tee"),
        (SELECT bottom_id FROM bottoms WHERE bottom_name = "light blue straight jeans"),
        9),
        (
        (SELECT shirt_id FROM shirts WHERE shirt_name = "cream baby tee"),
        (SELECT bottom_id FROM bottoms WHERE bottom_name = "light blue straight jeans"),
        4);

