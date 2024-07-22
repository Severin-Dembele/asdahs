UPDATE `asdahs`.`Question` SET `type` = 'CASE_COCHER_OTHER' WHERE (`id` = '5');
UPDATE `asdahs`.`Question` SET `type` = 'CASE_COCHER_OTHER' WHERE (`id` = '6');
UPDATE `asdahs`.`Question` SET `type` = 'CHOIX_MULTIPLE_OTHER' WHERE (`id` = '78');
UPDATE `asdahs`.`Question` SET `type` = 'CASE_COCHER_OTHER' WHERE (`id` = '105');


UPDATE `asdahs`.`Question` SET `numero` = '77' WHERE (`id` = '76');
UPDATE `asdahs`.`Question` SET `numero` = '95' WHERE (`id` = '96');
UPDATE `asdahs`.`Question` SET `numero` = '96' WHERE (`id` = '97');
UPDATE `asdahs`.`Question` SET `numero` = '98' WHERE (`id` = '99');

UPDATE `asdahs`.`Question` SET `numero` = '100' WHERE (`id` = '101');
UPDATE `asdahs`.`Question` SET `numero` = '104' WHERE (`id` = '105');



UPDATE `asdahs`.`Question` SET `numero` = '24' WHERE (`id` = '25');
UPDATE `asdahs`.`Question` SET `numero` = '25' WHERE (`id` = '26');
UPDATE `asdahs`.`Question` SET `numero` = '27' WHERE (`id` = '28');
UPDATE `asdahs`.`Question` SET `numero` = '28' WHERE (`id` = '29');
UPDATE `asdahs`.`Question` SET `numero` = '30' WHERE (`id` = '31');
UPDATE `asdahs`.`Question` SET `numero` = '31' WHERE (`id` = '32');
UPDATE `asdahs`.`Question` SET `numero` = '33' WHERE (`id` = '34');
UPDATE `asdahs`.`Question` SET `numero` = '34' WHERE (`id` = '35');
UPDATE `asdahs`.`Question` SET `numero` = '36' WHERE (`id` = '37');
UPDATE `asdahs`.`Question` SET `numero` = '37' WHERE (`id` = '38');
UPDATE `asdahs`.`Question` SET `numero` = '39' WHERE (`id` = '40');
UPDATE `asdahs`.`Question` SET `numero` = '40' WHERE (`id` = '41');
UPDATE `asdahs`.`Question` SET `numero` = '42' WHERE (`id` = '43');
UPDATE `asdahs`.`Question` SET `numero` = '43' WHERE (`id` = '44');
UPDATE `asdahs`.`Question` SET `numero` = '45' WHERE (`id` = '46');
UPDATE `asdahs`.`Question` SET `numero` = '46' WHERE (`id` = '47');
UPDATE `asdahs`.`Question` SET `numero` = '48' WHERE (`id` = '49');
UPDATE `asdahs`.`Question` SET `numero` = '49' WHERE (`id` = '50');
UPDATE `asdahs`.`Question` SET `numero` = '51' WHERE (`id` = '52');
UPDATE `asdahs`.`Question` SET `numero` = '52' WHERE (`id` = '53');
UPDATE `asdahs`.`Question` SET `numero` = '54' WHERE (`id` = '55');
UPDATE `asdahs`.`Question` SET `numero` = '55' WHERE (`id` = '56');
UPDATE `asdahs`.`Question` SET `numero` = '57' WHERE (`id` = '58');
UPDATE `asdahs`.`Question` SET `numero` = '58' WHERE (`id` = '59');
UPDATE `asdahs`.`Question` SET `numero` = '60' WHERE (`id` = '61');
UPDATE `asdahs`.`Question` SET `numero` = '61' WHERE (`id` = '62');
UPDATE `asdahs`.`Question` SET `numero` = '63' WHERE (`id` = '64');
UPDATE `asdahs`.`Question` SET `numero` = '64' WHERE (`id` = '65');
UPDATE `asdahs`.`Question` SET `numero` = '66' WHERE (`id` = '67');
UPDATE `asdahs`.`Question` SET `numero` = '67' WHERE (`id` = '68');
UPDATE `asdahs`.`Question` SET `numero` = '69' WHERE (`id` = '70');
UPDATE `asdahs`.`Question` SET `numero` = '70' WHERE (`id` = '71');




SELECT * 
FROM ReponseRepondu
INNER JOIN User ON ReponseRepondu.userId = User.id;

SELECT count(*) from Question where numero is null and sectionId<31;
