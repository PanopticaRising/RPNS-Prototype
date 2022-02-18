# Architecture

## Department for the Protection of Pets architecture

### Existing architecture

The current architecture for DPP involves storing RescuedPet information in an FTP server behind PetNet. The intention currently is to create a service that will poll
the FTP on a daily basis for information, potentially storing information in an on-prep database, and allowing for the server to send notifications via an SMS provider to the end-user.


This repository serves as an example for a Flask/React architecture for the end-user-facing portion of the application. It could be hosted on-prem, which would make access to the FTP server easier, but comes at the cost of maintainability and availability.

#### Proposal architecture - Cloud based

The React application can be served statically and connect with the Flask server over HTTPS. This provides standard protection for
end-user information when submitting signup requests.

The signup information can be stored as Phone-PetID pairs into a database like MySQL. This can be safely isolated on the cloud provider with virtual private network rules so that only the Flask server can access it.

There are two options for retrieving data from the FTP:
1. A dedicated service running behind PetNet can run a cron job to check the FTP and push only the relevant data (PetIDs) to the Flask server over a public endpoint.
2. Using a VPN connection between the Cloud Virtual Private Network and the PetNet firewall, the Flask server can directly poll the FTP, such as with a cron job.

Alternatively, if possible, reworking the FTP portion of the flow to expose a secure way for Rescuers to directly push information to the Flask server would be a more performant approach. If records are required, then this could utilize a streaming, in-memory database like Redis to both mirror the data on-disk for records and provide a publish-subscribe channel for notifications.

### Alternative Proposal architecture - Serverless

Assuming that this service is fully standalone, it is possible that even more cost-savings could be achieved by using a fully serverless architecture.

This would be composed of several factors:
* A simple user interface for DPP-users to push updates with currently held Pet IDs.
* A serverless function that:
    1. Accepts a Pet ID
    2. Can READ the database of Phone-PetID pairs
    3. Can push a notification to an SMS Provider
* A serverless function that:
    1. Accepts a Phone-PetID pair
    2. Can WRITE a new Phone-PetID pair to the database
    3. Optionally, accepts a keyword to delete the Phone-PetID pair.

#### Costs and Benefits

##### Cost
Using two serverless functions means that instead of paying an hourly rate for server time when the application is likely not under load, we would pay per-request.

##### Performance
This service does not have a performance requirement, and a serverless function execution is acceptable for a network request.

Assuming a large following of end-users desire to use the service on launch, concurrent execution for a service like AWS Lambda has a lower bound of 1,000 calls, and can be raised by the serverless provider.

##### Potential pitfalls
Using serverless functions prevents us from performing complex operations and changing the scope of the service. This is acceptable if we're confident about the nature of the project, but if more complex behavior is potentially desired, such as giving end-users greater control over their data, such as a User Profile, a serverless function may not be preferrable to a traditional server.