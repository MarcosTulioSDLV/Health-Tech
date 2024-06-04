
-- Table for Insurance
CREATE TABLE IF NOT EXISTS TB_INSURANCE(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Table for User
CREATE TABLE IF NOT EXISTS TB_USER(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(255) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    gender VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cell_phone_number VARCHAR(255) UNIQUE,
    home_phone_number VARCHAR(255) UNIQUE,
    insurance_card_number VARCHAR(255) UNIQUE NOT NULL,
    insurance_id BIGINT,
    FOREIGN KEY (insurance_id) REFERENCES TB_INSURANCE(id)
);