CREATE TABLE user (
  id                 BIGINT(20)  NOT NULL AUTO_INCREMENT,
  email              VARCHAR(255),
  forename           VARCHAR(50),
  surname            VARCHAR(50),
  password           VARCHAR(255),
  job_title          VARCHAR(20),
  base_site          VARCHAR(20),
  phone              VARCHAR(20),
  activation_date    DATE,
  failed_login_count INTEGER     NOT NULL DEFAULT 0,
  last_access        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  role               VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE white_list (
  id    BIGINT(20)  NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  role  VARCHAR(10) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (id)
);

CREATE TABLE config (
  name  VARCHAR(50)   NOT NULL,
  value VARCHAR(1024) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE ref_data (
  id               BIGINT(20)  NOT NULL AUTO_INCREMENT,
  category         VARCHAR(50) NOT NULL,
  parent_category VARCHAR(50),
  ref              VARCHAR(50) NOT NULL,
  text_value       VARCHAR(65000),
  number_value     FLOAT,
  valid_from       TIMESTAMP,
  valid_to         TIMESTAMP,
  PRIMARY KEY (id)
);
