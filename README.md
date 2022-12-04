##### Developers: Ella Rosenberg, Doron Chapnitsky, Yaniv Gilad and Yael Liberman.

# Jerusalem Theater Group
### Group description
The group's goal is to promote learning and creation through theater, especially inspired by Jewish sources. The group regrets its flag to bring to the discourse and stage topical issues and points on the agenda, to produce art and creation that has no place on the mainstream stages and large bodies, in an effort to provoke discussion and thinking of things that are taken for granted. Alongside the current performances, the group conducts projects designed for the elderly and children with special needs, with the aim of creating a bridge between genders and sectors, and connecting the community to cultural institutions in the city of Jerusalem and in Israel.

### Project goal
The aim is to streamline the work during the productions and improve the monitoring by dozens of counters - with the help of one software through which the production will be managed in all its aspects. The product that will be developed will allow simple control and management of the group's ongoing activities and the management of the project budget.

### Use cases UML Diagram
![use case](https://github.com/Yaniv-Gilad/theater-jerusalem/blob/main/use%20case.png)

#### Architecture- Deployment Diagram
![architecture](https://github.com/Yaniv-Gilad/theater-jerusalem/blob/main/Deployment%20Diagram.jpg)

#### Class Diagram
![architecture](https://github.com/Yaniv-Gilad/theater-jerusalem/blob/main/Class%20Diagram.jpg)

### Use case templates
#### Template for login
- Name – Login.
- Brief Description – Login to the website of the Producer.
- Actors – Producer man and the DB.
- Preconditions – The website is fully loaded and the producer man has a stable internet connection.
- Basic Flow:
  - The Producer enters his username and password, then clicks the button "Login".
  - The DB checks the information entered and sends the Producer to the home page, if successfuly entered. 
- Exception Flows – Providing an incorrect username and password: The website will let the Producer to try again.
- Post Conditions – Producer successfuly logged in and in the home page.

#### Template for create production
- Name – create production.
- Brief Description – The producer can create a production from the home page.
- Actors – Producer man and the DB.
- Preconditions – Successfuly logged in.
- Basic Flow:
  - The producer will click in home page on the "Create Production" button.
  - The producer will redirected to a new page that will get all of the information for the production and will click "OK" button.
  - The DB will allocate memory to the created production.
  - The Producer will get the approved message.
- Exception Flows – Insufficient details on clicking the "OK" button: The website will inform the Producer and will let him fill again.
- Post Conditions – The Producer gets an approved message and will be redirected to the created production page.

#### Template for add file
- Name – Add a file.
- Brief Description – Adding a file to the DB for the specified production.
- Actors – Producer man and the DB.
- Preconditions – Successfuly logged in and the production should exists.
- Basic Flow:
  - The Producer should click the "Add file" button on the specified production page.
  - The Producer will get a pop window which he can select which file to upload and press "OK".
  - The DB will save the selected file after allocating memory for it.
  - The Producer will get an approved message.
- Exception Flows – The file size is too big or encripted: The website will show an error message and the use case ends.
- Post Conditions – The file is displayed in the page and Producer will get an approved message.

## Requirements
### Functional

- The site will support the following operating systems: windows 7-10.
- The site will support the following browsers: edge, chrome.
- The dates on the site will be synchronized to Google Calendar.
- Add / delete / update / export files. 
- Add / delete folders.
- The site will only support the Hebrew language.

### Non-Functional
- Login will take up to 5 seconds.
- The database size should not exceed 10 GB.
- The site will support up to 100 users simultaneously. 

## Risks Assessment

| #    | Risk | Likely to occur | Steps to reduce risk | Response | Severity |
|------|---|--------|-------------|------------|---------|
| 1    | Using new tools in a new environment | Medium | Learn the new environment beforehand | Watching friends use these tools and attend classes of it | Medium |
| 2    | Change system requirements | Low   | Keeping up communication with the client | Re-coordinate expectations | Medium |
| 3    | 	Client won't fully accept final product | Low | 	Keeping up communication with the client | Refining procedures for the client and meet halfway | Low |





