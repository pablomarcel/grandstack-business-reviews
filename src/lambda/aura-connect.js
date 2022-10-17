(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://8a7de0dd.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'J@cqueline2022!';

    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session()

    try {
        const readQuery = `MATCH (n)
        RETURN COUNT(n) AS num`
        const readResult = await session.readTransaction((tx)=>
        tx.run(readQuery)
        )
        readResult.records.forEach((record)=>{
            console.log(`Found ${record.get("num")} nodes in the database`)
        })

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await session.close();
    }
    await driver.close()
})()
