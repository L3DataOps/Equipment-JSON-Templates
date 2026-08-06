***This README contains general information about the project, including setup instructions, usage, and other important details. As the project evolves, this document should be updated to reflect new features, changes, and important information to ensure the documentation remains accurate and useful.***




Run Master Script: (While in the Equipment JSON Templates folder) node master.js

Run Add Vendor Script: (While in the Equipment JSON Templates folder) node .\scripts\addvendor.js
Run Add Site Script: (While in the Equipment JSON Templates folder) node .\scripts\addsite.js

To update Vendors to Mongo:
    - Use the addvendor.js script to create the new vendors.
    - Make sure they are in a JSON file on their own.
    - Log in to the 9VMS0102 server and go to MongoDB Compass.
    - Find the vendors collection.
    - Hit "+ Add Data"
    - Then, "Import JSON or CSV file"
    - Select the JSON file you created with the new vendors.
    - After the Vendors are updated, hit "Export Data" > "Export the full collection" to download the new updated vendors collection from Mongo.


Equipment Types per JS script file:

    - addanalogchannel.js
        - analog channels
    - addats.js
        - ats
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