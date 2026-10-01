***This README contains general information about the project, including setup instructions, usage, and other important details. As the project evolves, this document should be updated to reflect new features, changes, and important information to ensure the documentation remains accurate and useful.***




Run Master Script: (While in the Equipment JSON Templates folder) node master.js

Run Add Vendor Script: (While in the Equipment JSON Templates folder) node .\scripts\addvendor.js
Run Add Site Script: (While in the Equipment JSON Templates folder) node .\scripts\addsite.js
Run Add RNM Customer: (While in the Equipment JSON Templates folder) node .\scripts\addrnmCustomer.js
Run Add RNM Equipment: (While in the Equipment JSON Templates folder) node .\scripts\addrnmEquipment.js
Run Add RNM Sites: (While in the Equipment JSON Templates folder) node .\scripts\addrnmSites.js
Run Add RNM Techs: (While in the Equipment JSON Templates folder) node .\scripts\addrnmTechs.js
Run Add RNM Vendors: (While in the Equipment JSON Templates folder) node .\scripts\addrnmVendors.js

To update Vendors to Mongo: (THIS GOES FOR ANY UPDATES. JUST CHANGE VENDORS TO WHATEVER YOU NEED)
    - Use the addvendor.js script to create the new vendors.
    - Make sure they are in a JSON file on their own.
    - Log in to the 9VMS0102 server and go to MongoDB Compass.
    - Find the vendors collection.
    - Hit "+ Add Data"
    - Then, "Import JSON or CSV file"
    - Select the JSON file you created with the new vendors.
    - After the Vendors are updated, hit "Export Data" > "Export the full collection" to download the new updated vendors collection from Mongo.


When creating a new script for a general piece of equipment. Use "addconventional_cp.js" as a template.


SLERS Equipment Types per JS script file:

    - addanalogchannel.js
        - analog channels
    - addats.js
        - ats
    - addbackupradio.js
        - add back up radios.
    - addchannel.js
        - channels
    - addcompound.js
        - add equipment to document RF site PM.
    - addconventional_cp.js
        - Add all CP SC conventional equipment
    - adddispatch.js
        - add dispatch centers
    - addfuel.js
        - add fuel and fuel tank equipment
    - addgenerator.js
        - add generator
    - addhvac.js
        - add hvac 1 and 2
    - addmicrowave.js
        - Add microwave, edgelink, and service shelf
    - addmutualaid.js
        - Add Mutual Aid Calling or TAC, Add GPS, Add Multiplexer, Add Power Supply, Add Sync Shelf, Add Test Unit Radio
    - addnetwork.js
        - Add Switches, Add Routers, Add Servers, Add IEA, Add GPS, Add Clocks, Add Network Sentry, Add MiniMe, Add Vida Edge
    - addshelter.js
        - Add Site Electricity, Add Site Civil, Add Site Telecom, Add AC-DC Power Supply Module, Add Vegetation Control, Add Shelter
    - addsite.js
        - Add sites.
    - addtower.js
        - Add Tower, Add Tower Lights, Add Combiner, Add Tower Top Amplifier (TTA), Add Multicoupler, Add Dehydrator
    - addups_rectifier.js
        - Add ups and rectifier.
    - adduser.js
        - Add users to ATLAS
    - addvendor.js
        - Add new vendor


PROCEDURE FOR UPLOADING SLERS EQUIPMENT INTO MONGO (1 SITE AT A TIME IS RECOMMENDED)

    1. Add all equipment to results. (uploading on VS code using the scripts)
        - IMPORTANT: Make sure the contents in each results folder is ONLY what you are currently uploading. Each relevant results folder should be empty before you begin to upload new equipment.
    2. Copy all of the files for the JSON results you added.
    3. In 9vms0102 navigate to "C:\Users\Administrator\Desktop\ATLAS Equipment UPLOADS"
    4. Create a new folder with the site name you are importing and paste the results JSON files you copied there.
    5. Inside that folder, create a new folder titled "Mongo Exports".
    6. Open Mongo.
    7. Navigate to each collection you need to upload equipment into.
        - For example: I want to upload equipment for the mutual aid so I will open the mutualaid collection in Mongo.
    8. Hit "+ ADD DATA" -> "Import JSON or CSV file"
    9. Navigate to the folder we created earlier and choose the results JSON file corresponding with the collection and equipment you are uploading.
    10. Follow the prompts to complete the upload.
    11. After uploading, his the refresh button to verify the new equipment has been added to the collection.
    12. Click "EXPORT DATA" -> "Export the full collection" -> JSON -> and hit "Export..."
    13. Navigate to the "Mongo Exports" Folder we created earlier inside the folder named after the site we are currently working on and export there.
        - NOTE: The further down the list we get with uploading sites and equipment, the larger each mongo export will get. This folder is specifically to keep a history of each mongo export so that we can keep track of the changes as they happened.
    14. Go to file explorer on the 9vms0102 server and open the Mongo Exports folder that we created.
    15. Head over to your pc and open your VS Code.
    16. One by one open each mongo exports file, ctrl+A, copy, and paste each one to the corresponding file under the Mongo foler in you instance of VS Code.
    17. Overwrite whatever necessary.
        - NOTE: This is the only way to make sure your code is up to date with the Object IDs that Mongo creates after you upload anything to the collections. This way we are sure they are up to date on VS code.
    18. Now in VS Code go to each of the files under results that you initially added information to after running the scripts in step 1.
    19. Ctrl+A, cut, and paste them inside each of the corresponding files with the SAME NAME under the ARCHIVE Folder.



!!!!!IN PROGRESS!!!!!

PROCEDURE FOR UPLOADING REMOTE EQUIPMENT INTO MONGO (1 CUSTOMER AT A TIME IS RECOMMENDED)

    1. Add all equipment to results. (uploading on VS code using the scripts)
        - IMPORTANT: Make sure the contents in each results folder is ONLY what you are currently uploading. Each relevant results folder should be empty before you begin to upload new equipment.
    2. Copy all of the files for the JSON results you added.
    3. In 9vms0102 navigate to "C:\Users\Administrator\Desktop\ATLAS Remote Equipment Uploads" -> and go into "Equipment Uploads"
    4. Create a new folder with the site name you are importing and paste the results JSON files you copied there.
    5. Inside that folder, create a new folder titled "Mongo Exports".
    6. Open Mongo.
    7. Navigate to each collection you need to upload equipment into.
        - For example: I want to upload equipment for the mutual aid so I will open the mutualaid collection in Mongo.
    8. Hit "+ ADD DATA" -> "Import JSON or CSV file"
    9. Navigate to the folder we created earlier and choose the results JSON file corresponding with the collection and equipment you are uploading.
    10. Follow the prompts to complete the upload.
    11. After uploading, his the refresh button to verify the new equipment has been added to the collection.
    12. Click "EXPORT DATA" -> "Export the full collection" -> JSON -> and hit "Export..."
    13. Navigate to the "Mongo Exports" Folder we created earlier inside the folder named after the site we are currently working on and export there.
        - NOTE: The further down the list we get with uploading sites and equipment, the larger each mongo export will get. This folder is specifically to keep a history of each mongo export so that we can keep track of the changes as they happened.
    14. Go to file explorer on the 9vms0102 server and open the Mongo Exports folder that we created.
    15. Head over to your pc and open your VS Code.
    16. One by one open each mongo exports file, ctrl+A, copy, and paste each one to the corresponding file under the Mongo foler in you instance of VS Code.
    17. Overwrite whatever necessary.
        - NOTE: This is the only way to make sure your code is up to date with the Object IDs that Mongo creates after you upload anything to the collections. This way we are sure they are up to date on VS code.
    18. Now in VS Code go to each of the files under results that you initially added information to after running the scripts in step 1.
    19. Ctrl+A, cut, and paste them inside each of the corresponding files with the SAME NAME under the ARCHIVE Folder.