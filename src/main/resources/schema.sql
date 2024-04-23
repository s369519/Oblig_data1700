CREATE TABLE IF NOT EXISTS `billett` (
    `id` INTEGER  PRIMARY KEY AUTO_INCREMENT,
    `film` VARCHAR(50) NOT NULL,
    `antall` INTEGER  NOT NULL,
    `fornavn` VARCHAR(50) NOT NULL,
    `etternavn` VARCHAR(50) NOT NULL,
    `telefonnr` VARCHAR(50) NOT NULL,
    `epost` VARCHAR(50) NOT NULL
    );