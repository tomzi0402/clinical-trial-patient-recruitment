
# Clinical Trial Patient Recruitment System (API backend module)

### How to test API
Run `mvn test` from /api directory

### How to build API
Run `mvn clean package` from /api directory

### How to start API
Run `mvn spring-boot:run` from /api directory

### How to access in-memory H2 database in runtime
[http://localhost:8080/h2-console](http://localhost:8080/h2-console) - H2 Database could be accessed by browser after started up the server

Details may be various depending on which application.properties being used
* JDBC URL: jdbc:h2:mem:clinical_trial_db
* Password: password