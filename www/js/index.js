/*
File name : index.js
Description : Display the content of the home page
for the test it's blocked to 30 elements.
 */

// function to get all the armor
function getListArmor() {
  query = 'SELECT * FROM Tbl_Armor';
  selectRow(query, displayListArmor);
}

// function to get the list of all the weapon
function getListWeapon() {
  query = 'SELECT * FROM Tbl_Weapons';
  selectRow(query, displayListWeapon);
}

// function to get the list of all items in the local storage
function getListItem() {
  query = 'SELECT * FROM Tbl_Items';
  selectRow(query, displayListItem);
}

// function to display all the armors
function displayListArmor(results) {
  console.log('displaying armors.');
  var container = document.getElementById('armors-list');
  var len = results.rows.length;
  var content = '';
  for (var i = 0; i < len; i++) {
    if (results.rows.item(i).Txt_ImageMale != null) {
      image = results.rows.item(i).Txt_ImageMale;
    } else if (results.rows.item(i).Txt_ImageFemale != null) {
      image = results.rows.item(i).Txt_ImageFemale;
    } else {
      image = 'img/imgNotFound.png';
    }
    content +=
      `
          <li>
            <a href="/armor/` +
      results.rows.item(i).Id_Armor +
      `" class="item-link item-content">
              <div class="item-media"><i class="icon icon-f7">
                <img class="list-image" src="` +
      image +
      `">
                </img>
              </i></div>
              <div class="item-inner">
                <div class="item-title"><div class="armor-list">` +
      results.rows.item(i).Txt_Name +
      `</div></div>
              </div>
            </a>
          </li>
          `;
  }
  container.innerHTML = content;
}

//display an armor
function displayArmor(id) {
  db.transaction(function(tx) {
    tx.executeSql(
      'SELECT * FROM Tbl_Armor INNER JOIN Tbl_ArmorSets ON Tbl_ArmorSets.Id_ArmorSet = Tbl_armor.Id_ArmorSet WHERE Id_Armor = ' +
        id,
      [],
      function(tx, results) {
        if (results.rows.item(0).No_Slot_1_Rank == 'undefined') {
          slot1 = 0;
        } else {
          slot1 = results.rows.item(0).No_Slot_1_Rank;
        }
        if (results.rows.item(0).No_Slot_2_Rank == 'undefined') {
          slot2 = 0;
        } else {
          slot2 = results.rows.item(0).No_Slot_2_Rank;
        }
        if (results.rows.item(0).No_Slot_3_Rank == 'undefined') {
          slot3 = 0;
        } else {
          slot3 = results.rows.item(0).No_Slot_3_Rank;
        }
        if (results.rows.item(0).No_Slot_4_Rank == 'undefined') {
          slot4 = 0;
        } else {
          slot4 = results.rows.item(0).No_Slot_4_Rank;
        }

        if (results.rows.item(0).Txt_ImageMale != null) {
          image = results.rows.item(0).Txt_ImageMale;
        } else if (results.rows.item(0).Txt_ImageFemale != null) {
          image = results.rows.item(0).Txt_ImageFemale;
        } else {
          image = 'img/imgNotFound.png';
        }
        document.getElementById('armor-icon').setAttribute('src', image);
        document.getElementById('armor-name').innerHTML = results.rows.item(
          0
        ).Txt_Name;
        document.getElementById('armor-part').innerHTML = results.rows.item(
          0
        ).Txt_Type;
        document.getElementById('base').innerHTML =
          'base: ' + results.rows.item(0).No_BaseDefence;
        document.getElementById('max').innerHTML =
          'max: ' + results.rows.item(0).No_MaxDefence;
        document.getElementById('aug').innerHTML =
          'aug: ' + results.rows.item(0).No_AugmentedDefence;
        document.getElementById('fire').innerHTML =
          'fire: ' + results.rows.item(0).No_fire_resistance;
        document.getElementById('water').innerHTML =
          'water: ' + results.rows.item(0).No_water_resistance;
        document.getElementById('ice').innerHTML =
          'ice: ' + results.rows.item(0).No_ice_resistance;
        document.getElementById('thunder').innerHTML =
          'thunder: ' + results.rows.item(0).No_thunder_resistance;
        document.getElementById('dragon').innerHTML =
          'dragon: ' + results.rows.item(0).No_dragon_resistance;
        document.getElementById('slot0').innerHTML = slot1;
        document.getElementById('slot1').innerHTML = slot2;
        document.getElementById('slot2').innerHTML = slot3;
        document.getElementById('slot3').innerHTML = slot4;
      }
    );
  }, null);
}

//function to display the list of all weapon
function displayListWeapon(results) {
  console.log('displaying weapons.');
  var container = document.getElementById('weapons-list');
  var len = results.rows.length;
  var content = '';
  for (var i = 0; i < 30; i++) {
    if (results.rows.item(i).Txt_Icon != null) {
      image = results.rows.item(i).Txt_Icon;
    } else {
      image = 'img/imgNotFound.png';
    }
    content +=
      `
          <li>
            <a href="/weapon/` +
      results.rows.item(i).Id_Weapon +
      `" class="item-link item-content">
              <div class="item-media"><i class="icon icon-f7">
                <img class="list-image" src="` +
      image +
      `">
                </img>
              </i></div>
              <div class="item-inner">
                <div class="item-title"><div class="weapon-list">` +
      results.rows.item(i).Txt_Name +
      `</div></div>
              </div>
            </a>
          </li>
          `;
  }
  container.innerHTML = content;
}

// function to display a weapon
function displayWeapon(id) {
  db.transaction(function(tx) {
    tx.executeSql(
      'SELECT * FROM Tbl_Weapons WHERE Id_Weapon = ' + id,
      [],
      function(tx, results) {
        if (results.rows.item(0).Txt_Image != null) {
          image = results.rows.item(0).Txt_Image;
        } else {
          image = 'img/imgNotFound.png';
        }
        document.getElementById('weapon-icon').setAttribute('src', image);
        document.getElementById('weapon-name').innerHTML = results.rows.item(
          0
        ).Txt_Name;
        document.getElementById('weapon-part').innerHTML = results.rows.item(
          0
        ).Txt_Type;
        document.getElementById('display').innerHTML =
          'Display: ' + results.rows.item(0).No_DisplayAttack;
        document.getElementById('raw').innerHTML =
          'Raw: ' + results.rows.item(0).No_RawAttack;
        document.getElementById('elderSeal').innerHTML =
          'elderSeal: ' + results.rows.item(0).Is_Elderseal;
        document.getElementById('type').innerHTML =
          'type: ' + results.rows.item(0).Txt_DamageType;
        //document.getElementById('coating1').innerHTML = results.rows.item(0).No_Slot_1_Rank;
        //document.getElementById('coating2').innerHTML = results.rows.item(0).No_Slot_2_Rank;
        //document.getElementById('coating3').innerHTML = results.rows.item(0).No_Slot_3_Rank;
        //document.getElementById('coating4').innerHTML = results.rows.item(0).No_Slot_4_Rank;
        document.getElementById('element').innerHTML = results.rows.item(
          0
        ).Id_Element;
      }
    );
  }, null);
}

// function to display the list of all items
function displayListItem(results) {
  console.log('displaying items.');
  var container = document.getElementById('items-list');
  var len = results.rows.length;
  var content = '';
  for (var i = 0; i < 30; i++) {
    content +=
      `
          <li>
            <a href="/item/` +
      results.rows.item(i).Id_Item +
      `" class="item-link item-content">
              <div class="item-inner">
                <div class="item-title">` +
      results.rows.item(i).Txt_Name +
      `</div>
              </div>
            </a>
          </li>
          `;
  }
  container.innerHTML = content;
}

// function to display one item
function displayItem(id) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM Tbl_Items WHERE id_Item = ' + id, [], function(
      tx,
      results
    ) {
      // the image for the item is fix because the api doesn't have one.
      document.getElementById('item-icon').setAttribute('src', 'img/item.png');
      document.getElementById('item-name').innerHTML = results.rows.item(
        0
      ).Txt_Name;
      document.getElementById('description').innerHTML = results.rows.item(
        0
      ).Txt_Desc;
      document.getElementById('rarity').innerHTML =
        'rarity: ' + results.rows.item(0).Nb_Rarity;
      document.getElementById('carry').innerHTML =
        'carry Limit: ' + results.rows.item(0).Nb_CarryLimit;
      document.getElementById('value').innerHTML =
        'Valeur en zenny: ' + results.rows.item(0).Nb_Value;
    });
  }, null);
}

// function for the search bar
function checkInput() {
  var query = document.getElementById('search').value;
  window.find(query);
  return true;
}
