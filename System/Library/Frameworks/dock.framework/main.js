fetch('./dockitem.json')
    .then(response => response.json())
    .then(data => {
        const itemsArray = data.items;
        const result = itemsArray.map(item => ({
            name: item[0],
            path: item[1],
            icon: item[2]
        }));
        console.log(result);
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });