import { getDatabase, push, onValue, ref, set } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app"

export function initHW4AppDB() {
    initializeApp(firebaseConfig);
}

export function storeItemData(item) {
    const db = getDatabase();
    const reference = ref(db, "itemData/");
    console.log(item.id);
    push(reference, item);
}


export function setupItemDataListener() {
    var listItems = []
    console.log("DataListener called");
    const db = getDatabase();
    const reference = ref(db, "itemData/");
    onValue(reference, (snapshot) => {
        console.log("data listener executes with : ",snapshot);
        snapshot.forEach((item) => {
            listItems.push({
              id: item.key,
              itemName:item.val().itemName,
              itemDescription:item.val().itemDescription,
              itemLocDesc:item.val().itemLocDesc,
              notes:item.val().notes,
              itemAddress:item.val().itemAddress,
              itemSellerAdd:item.val().itemSellerAdd,
              itemLocation:item.val().itemLocation,
              currentDate: Date(item.val().currentDate),
            })
          });
    });
    return listItems;
}