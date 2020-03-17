// constants
const API_MONSTER_HUNTER_WORLD = null;
const KEY_DATA_CATALOGUE = 'MHW';
//import {updateData, reloadData} from 'api.js';

// Database name, Version number, Text description, estimated size in byte
var db = openDatabase('mhwDb', '1.0', 'mhwDb', 1 * 1024 * 1024);

function init(IntervalUpdateInD, callback) {
  db.transaction(function(tx) {
    //tx.executeSql('DROP TABLE Tbl_Weapons', null, null, executionKO);
    // create DB schema
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Weapons (Id_Weapon integer primary key, Txt_Name text , Txt_Type text , Nb_Rarity integer , No_DisplayAttack integer , No_RawAttack integer , Is_Elderseal integer, Txt_DamageType text, Id_Element integer, Txt_Icon text, Txt_Image text, Id_Coating integer, Txt_Phial text, Txt_Shelling text, Txt_BoostType text, Id_Ammo integer, Txt_SpecialAmmo text, Txt_Deviation text, No_Slot_1_Rank integer, No_Slot_2_Rank integer, No_Slot_3_Rank integer, No_Slot_4_Rank integer)',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Armor (Id_Armor integer primary key, Txt_Name text , Txt_Type text , Nb_Rarity integer , No_BaseDefence integer , No_MaxDefence integer , No_AugmentedDefence integer , No_fire_resistance integer , No_water_resistance integer , No_ice_resistance integer , No_thunder_resistance integer , No_dragon_resistance integer  ,Id_ArmorSet integer, Txt_ImageMale text , Txt_ImageFemale text, No_Slot_1_Rank integer, No_Slot_2_Rank integer, No_Slot_3_Rank integer, No_Slot_4_Rank integer )',
      null,
      null,
      executionKO
    ); //0 = false
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Items (Id_Item integer primary key, Txt_Name text , Txt_Desc text , Nb_Rarity integer , Nb_CarryLimit integer , Nb_Value integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_ListDurability (Id_Weapon integer , Id_Durability integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Durability (Id_Durability integer primary key, Txt_color text , No_durability integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Elements (Id_Element integer primary key, Txt_Type text , Nb_Damage integer , Is_Hidden integer )',
      null,
      null,
      executionKO
    ); //0 = false
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Coating (Id_Coating integer primary key, Txt_Type text )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Ammo (Id_Ammo integer primary key, Txt_Type text , Nb_Capacity integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_CraftingCost (Id_CraftingCost integer primary key, Nb_Quantity integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_ArmorSkills (Id_Armor integer , Id_Skill integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_ArmorSets (Id_ArmorSet integer primary key, Txt_SetName text , Txt_Rank text )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_ArmorSetsBonus (Id_ArmorSetBonus integer primary key, Txt_Name text , Id_ArmorSetBonusRank integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_ArmorSetsBonusRanks (Id_ArmorSetBonusRank integer primary key, Nb_Pieces integer , Id_SkillRank integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Resistances (Id_Armor integer , Id_TypeResistance integer , No_Value integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Skills (Id_Skill integer primary key, Txt_Name text , Txt_Desc text , Id_Rank )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_TypeResistances (Id_TypeResistance integer primary key, Txt_Type text )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_SkillsRank (Id_SkillRank integer primary key, No_Level integer , Txt_Desc text , Id_Modifier , Id_Skill integer )',
      null,
      null,
      executionKO
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Modifiers (Id_Modifier integer primary key, Txt_Type text , No_Value integer )',
      null,
      null,
      executionKO
    );

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Tbl_Catalogue (Id_Catalogue integer primary key, Nm_Catalogue text , Dttm_Last_Update text )',
      null,
      null,
      executionKO
    );

    // insert initial data
    tx.executeSql(
      "INSERT INTO Tbl_Catalogue (Nm_Catalogue, Dttm_Last_Update) SELECT '" +
        KEY_DATA_CATALOGUE +
        "', datetime() WHERE NOT EXISTS (SELECT 1 FROM Tbl_Catalogue WHERE Nm_Catalogue = '" +
        KEY_DATA_CATALOGUE +
        "')",
      null,
      null,
      executionKO
    );

    tx.executeSql(
      "SELECT Dttm_Last_Update < datetime('now', '-" +
        IntervalUpdateInD +
        " days') refreshData, Nb_Data FROM Tbl_Catalogue, (SELECT COUNT(*) as Nb_Data FROM Tbl_Armor) WHERE Nm_Catalogue = '" +
        KEY_DATA_CATALOGUE +
        "'",
      null,
      function(tx, results) {
        let catalogue = results.rows[0];

        if (catalogue.Nb_Data == 0 || catalogue.refreshData) {
          fetchAll(callback);
        } else {
          callback();
        }
      },
      executionKO
    );
  }, txKO);
}

function fetchAll(callback) {
  console.log('fetchAll started');
  fetchArmor(callback);
  fetchWeapon(callback);
  fetchItem(callback);
  //TODO fetch all the other content
}

function fetchArmor(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://mhw-db.com/armor',
    success: function(data, textStatus, jqXHR) {
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Tbl_Armor', null, null, executionKO);
        tx.executeSql('DELETE FROM Tbl_ArmorSets', null, null, executionKO);
        tx.executeSql('DELETE FROM Tbl_ArmorSkills', null, null, executionKO);
      }, txKO);
      for (let i = 0; i < data.length; i++) {
        let armor = data[i];
        armor_name = armor.name;
        armor_type = armor.type;
        armor_rarity = armor.rarity;
        armor_def_base = armor.defense.base;
        armor_def_max = armor.defense.max;
        armor_def_aug = armor.defense.augmented;
        armor_res_fire = armor.resistances.fire;
        armor_res_water = armor.resistances.water;
        armor_res_ice = armor.resistances.ice;
        armor_res_thunder = armor.resistances.thunder;
        armor_res_dragon = armor.resistances.dragon;
        armor_slot1 = armor.slots[0];
        armor_slot2 = armor.slots[1];
        armor_slot3 = armor.slots[2];
        armor_slot4 = armor.slots[3];
        if (armor.armorSet != null) {
          armor_set = armor.armorSet.id;
        } else {
          armor_set = null;
        }
        if (armor.assets != null) {
          if (armor.assets.imageMale != null) {
            armor_male = armor.assets.imageMale;
          } else {
            armor_male = null;
          }
          if (armor.assets.imageFemale != null) {
            armor_female = armor.assets.imageFemale;
          } else {
            armor_female = null;
          }
        } else {
          armor_male = null;
          armor_female = null;
        }
        insertArmor(
          armor_name,
          armor_type,
          armor_rarity,
          armor_def_base,
          armor_def_max,
          armor_def_aug,
          armor_res_fire,
          armor_res_water,
          armor_res_ice,
          armor_res_thunder,
          armor_res_dragon,
          armor_set,
          armor_male,
          armor_female,
          armor_slot1,
          armor_slot2,
          armor_slot3,
          armor_slot4
        );
        //insertArmorSkill(data[i]);
      }
      fetcharmorSets(callback);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + textStatus);
    }
  });
  console.log('armor done');
}

function insertArmor(
  armor_name,
  armor_type,
  armor_rarity,
  armor_def_base,
  armor_def_max,
  armor_def_aug,
  armor_res_fire,
  armor_res_water,
  armor_res_ice,
  armor_res_thunder,
  armor_res_dragon,
  armor_set,
  armor_male,
  armor_female,
  armor_slot1,
  armor_slot2,
  armor_slot3,
  armor_slot4
) {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO Tbl_Armor (Txt_Name, Txt_Type, Nb_Rarity, No_BaseDefence, No_MaxDefence, No_AugmentedDefence, No_fire_resistance, No_water_resistance, No_ice_resistance, No_thunder_resistance, No_dragon_resistance, Id_ArmorSet, Txt_ImageMale, Txt_ImageFemale, No_Slot_1_Rank, No_Slot_2_Rank, No_Slot_3_Rank, No_Slot_4_Rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
      [
        armor_name,
        armor_type,
        armor_rarity,
        armor_def_base,
        armor_def_max,
        armor_def_aug,
        armor_res_fire,
        armor_res_water,
        armor_res_ice,
        armor_res_thunder,
        armor_res_dragon,
        armor_set,
        armor_male,
        armor_female,
        armor_slot1,
        armor_slot2,
        armor_slot3,
        armor_slot4
      ],
      null,
      executionKO
    );
  }, txKO);
  console.log('armor inserted.');
}

function insertArmorSkill(armor) {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO Tbl_ArmorSkills (Id_Armor, Id_Skill) VALUES (?, ?)',
      [armor.id, armor.skills.id],
      null,
      executionKO
    );
  }, txKO);
}

function fetcharmorSets(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://mhw-db.com/armor/sets',
    success: function(data, textStatus, jqXHR) {
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Tbl_ArmorSets', null, null, executionKO);
      }, txKO);
      for (let i = 0; i < data.length; i++) {
        let set = data[i];
        set_name = set.name;
        set_rank = set.rank;
        insertArmorSet(set_name, set_rank);
      }
      callback();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + textStatus);
    }
  });
  console.log('armor sets done');
}

function insertArmorSet(set_name, set_rank) {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO Tbl_ArmorSets (Txt_SetName, Txt_Rank) VALUES (?, ?)',
      [set_name, set_rank],
      null,
      executionKO
    );
  }, txKO);
}

function fetchSkills() {
  db.transaction(function(tx) {
    $.ajax({
      type: 'GET',
      url: 'https://mhw-db.com/skills',
      success: function(data, textStatus, jqXHR) {
        db.transaction(function(tx) {
          tx.executeSql('DELETE FROM Tbl_Skills', null, null, executionKO);
          tx.executeSql('DELETE FROM Tbl_SkillsRank', null, null, executionKO);

          for (let i = 0; i < data.length; i++) {
            let skill = data[i];
            skill.ranks.forEach(rank => {
              tx.executeSql(
                'INSERT INTO Tbl_SkillsRank (Id_SkillRank, No_Level, Txt_Desc, Id_Modifier, Id_Skill) VALUES (?, ?, ?, ?, ?)',
                [
                  rank.id,
                  rank.level,
                  rank.description,
                  rank.modifiers,
                  skill.id
                ],
                null,
                executionKO
              );
            });
            tx.executeSql(
              'INSERT INTO Tbl_Skills (Id_Skill, Txt_Name, Txt_Desc, Id_Rank) VALUES (?, ?, ?, ?)',
              [skill.id, skill.name, skill.description, skill.ranks.id],
              null,
              executionKO
            );
          }
        }, txKO);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Error: ' + textStatus);
      }
    });
  }, txKO);
}

function fetchItem(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://mhw-db.com/items',
    success: function(data, textStatus, jqXHR) {
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Tbl_Items', null, null, executionKO);
      }, txKO);
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        item_name = item.name;
        item_rarity = item.rarity;
        item_value = item.value;
        item_carry = item.carryLimit;
        item_desc = item.description;

        insertItem(item_name, item_rarity, item_value, item_carry, item_desc);
        //insertArmorSkill(data[i]);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + textStatus);
    }
  });
  console.log('armor done');
}

function insertItem(item_name, item_rarity, item_value, item_carry, item_desc) {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO Tbl_Items (Txt_Name, Txt_Desc, Nb_Rarity, Nb_CarryLimit, Nb_Value) VALUES (?, ?, ?, ?, ?)',
      [item_name, item_desc, item_rarity, item_carry, item_value],
      null,
      executionKO
    );
  }, txKO);
  console.log('item inserted.');
}

function fetchWeapon(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://mhw-db.com/weapons',
    success: function(data, textStatus, jqXHR) {
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Tbl_Weapons', null, null, executionKO);
        //tx.executeSql('DELETE FROM Tbl_ArmorSets', null, null, executionKO);
        //tx.executeSql('DELETE FROM Tbl_ArmorSkills', null, null, executionKO);
      }, txKO);
      for (let i = 0; i < data.length; i++) {
        let weapon = data[i];
        weapon_Name = weapon.name;
        weapon_Type = weapon.type;
        weapon_Rarity = weapon.rarity;
        weapon_DisplayAttack = weapon.attack.display;
        weapon_RawAttack = weapon.attack.raw;
        weapon_Elderseal = weapon.elderseal;
        weapon_DamageType = weapon.damageType;
        weapon_Element = null;
        weapon_Coating = null;
        weapon_Phial = null;
        weapon_Shelling = null;
        weapon_BoostType = null;
        weapon_Ammo = null;
        weapon_SpecialAmmo = null;
        weapon_Deviation = null;
        weapon_slot1 = weapon.slots[0];
        weapon_slot2 = weapon.slots[1];
        weapon_slot3 = weapon.slots[2];
        weapon_slot4 = weapon.slots[3];

        if (weapon.assets != null) {
          if (weapon.assets.icon != null) {
            weapon_Icon = weapon.assets.icon;
          } else {
            weapon_Icon = null;
          }
          if (weapon.assets.image != null) {
            weapon_Image = weapon.assets.image;
          } else {
            weapon_Image = null;
          }
        } else {
          weapon_Icon = null;
          weapon_Image = null;
        }

        insertWeapon(
          weapon_Name,
          weapon_Type,
          weapon_Rarity,
          weapon_DisplayAttack,
          weapon_RawAttack,
          weapon_Elderseal,
          weapon_DamageType,
          weapon_Element,
          weapon_Icon,
          weapon_Image,
          weapon_Coating,
          weapon_Phial,
          weapon_Shelling,
          weapon_BoostType,
          weapon_Ammo,
          weapon_SpecialAmmo,
          weapon_Deviation
        );
        //insertArmorSkill(data[i]);
      }
      //TODO: possible callback
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + textStatus);
    }
  });
  console.log('weapon done');
}

function insertWeapon(
  weapon_Name,
  weapon_Type,
  weapon_Rarity,
  weapon_DisplayAttack,
  weapon_RawAttack,
  weapon_Elderseal,
  weapon_DamageType,
  weapon_Element,
  weapon_Icon,
  weapon_Image,
  weapon_Coating,
  weapon_Phial,
  weapon_Shelling,
  weapon_BoostType,
  weapon_Ammo,
  weapon_SpecialAmmo,
  weapon_Deviation
) {
  db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO Tbl_Weapons (Txt_Name, Txt_Type, Nb_Rarity, No_DisplayAttack, No_RawAttack, Is_Elderseal, Txt_DamageType, Id_Element, Txt_Icon, Txt_Image, Id_Coating, Txt_Phial, Txt_Shelling, Txt_BoostType, Id_Ammo, Txt_SpecialAmmo, Txt_Deviation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        weapon_Name,
        weapon_Type,
        weapon_Rarity,
        weapon_DisplayAttack,
        weapon_RawAttack,
        weapon_Elderseal,
        weapon_DamageType,
        weapon_Element,
        weapon_Icon,
        weapon_Image,
        weapon_Coating,
        weapon_Phial,
        weapon_Shelling,
        weapon_BoostType,
        weapon_Ammo,
        weapon_SpecialAmmo,
        weapon_Deviation
      ],
      null,
      executionKO
    );
  }, txKO);
  console.log('weapon inserted.');
}

function selectRow(query, callBack) {
  // <-- extra param
  var result = [];
  db.transaction(function(tx) {
    tx.executeSql(
      query,
      [],
      function(tx, results) {
        callBack(results);
      },
      txKO
    );
  });
}

function executionKO(tx, error) {
  txKO(error);
}

function txKO(error) {
  alert('Error: ' + error.message);
  console.log(error.message);
}
