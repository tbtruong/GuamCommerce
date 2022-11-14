This application tracks grocery prices.

What should this application be able to do:

1. I should be able to search for an item and see the price history. These prices should be standardized.
2. I should be able to add a new price to the history.
3. I should be able to view by lowest price and sort by store.
4. I should be able to have a function that compares an item in store to my best database price.
__________________________________________________________________________________________________________

1. I should be able to search for an item and see the price history. These prices should be standardized.
    a. Backend
           - Route (GET) to get specific item by name.
           - Req Input: Name
           - Res Output: Price history in json array format.
    b. Database
        - Table: Groceries
        - Columns: UUID, Name, Price, Date_Purchased, Store

2. I should be able to add a new price to the history.
    a. Backend
        - Route (POST) to put new entry into database
        - Req Input: {name, price, metric, date, store, sale}
        - Res Output: N/A
    b. Database
        - Table: Groceries
        - Columns: UUID, Name, Price, Date_Purchased, Store, Sale




