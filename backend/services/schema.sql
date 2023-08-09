-- CREATE DATABASE capsule_project;
-- Source: https://arctype.com/blog/collaborative-filtering-tutorial/ 
-- Source: https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-basic-ops 
USE capsule_project;

-- Create a table for shirts
CREATE TABLE IF NOT EXISTS shirts (
    shirt_id int PRIMARY KEY AUTO_INCREMENT,
    shirt_file_name varchar(255) NOT NULL,
    shirt_img_url varchar(1024) NOT NULL, 
    created TIMESTAMP NOT NULL DEFAULT NOW()
) ENGINE=INNODB;

INSERT INTO shirts (shirt_name, shirt_img)
VALUES
("gray baby tee", 'https://www.aritzia.com/us/en/product/baker-sculpt-knit-tank/106688.html?dwvar_106688_color=1274'), 
("cream baby tee", 'https://www.aritzia.com/us/en/product/baker-sculpt-knit-tank/106688.html?dwvar_106688_color=1274');

-- Create a table for botoms
CREATE TABLE IF NOT EXISTS bottoms (
    bottom_id int PRIMARY KEY AUTO_INCREMENT,
    bottom_file_name varchar(255) NOT NULL,
    bottom_img_url varchar(1024) NOT NULL, 
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

INSERT IGNORE INTO ratings (shirt_id, bottom_id, rating)
    VALUES (
        (SELECT shirt_id FROM shirts WHERE shirt_name = "gray baby tee"),
        (SELECT bottom_id FROM bottoms WHERE bottom_name = "light blue straight jeans"),
        9),
        (
        (SELECT shirt_id FROM shirts WHERE shirt_name = "cream baby tee"),
        (SELECT bottom_id FROM bottoms WHERE bottom_name = "light blue straight jeans"),
        4);

-- Create UNIQUE constraint to prevent duplicates

ALTER TABLE shirts
ADD CONSTRAINT uc_shirt UNIQUE (shirt_name);

ALTER TABLE bottoms
ADD CONSTRAINT uc_bottom UNIQUE (bottom_name);

ALTER TABLE ratings
ADD CONSTRAINT uc_rating UNIQUE (shirt_id, bottom_id);


-- Delete Duplicate rows: https://www.mysqltutorial.org/mysql-delete-duplicate-rows/
DELETE rating1 FROM ratings rating1
INNER JOIN ratings rating2 
WHERE
    rating1.rating_id < rating2.rating_id AND 
    rating1.shirt_id = rating2.shirt_id AND
    rating1.bottom_id = rating2.bottom_id;

-- Update Row with Unique Constraint: https://stackoverflow.com/questions/75262403/how-to-update-a-row-with-a-unique-constraint-postgresql 
UPDATE ratings
SET rating = 8
WHERE shirt_id = (SELECT shirt_id FROM shirts WHERE shirt_name = "gray baby tee") and bottom_id = (SELECT bottom_id FROM bottoms WHERE bottom_name = "light blue straight jeans");



