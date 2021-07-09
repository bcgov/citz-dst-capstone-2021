# Architectural Decision Log

**Database:** MongoDB

**UI Frameworks:**
- MaterialUI
- Formik

**Data Visualization Libraries:** *undecided*

---
# Database Choice - SQL/NoSQL

### Background
This report compares SQL and NoSQL, and discusses which is better for our project.

### SQL Pros and Cons

#### Pros
- **Reduced data storage** footprint due to normalization and other optimization opportunities. Often results in better performance and more efficient use of resources.
- Strong and well-understood data integrity semantics through **ACID** (Atomicity, Consistency, Isolation, Durability).
- Standard access to data via SQL.
- Generally more flexible query support capable of handling a broader range of workloads. SQL abstracts over the underlying implementation and allows the engine to optimize queries to fit their on-disk representation.

#### Cons
- **Rigid data models** that require the careful up-front design to ensure adequate performance and resist evolution—changing a schema will often include downtime
- Scaling horizontally is challenging—either completely unsupported, supported in an ad-hoc way, or only supported on relatively immature technologies
- Non-distributed engines are generally a "single point of failure" that must be mitigated by replication and failover techniques; no illusion of infinite scalability

### NoSQL Pros and Cons<sup>*</sup>
This was largely aimed at solving two perceived problems with existing systems:

Lack of horizontal scalability
**Rigidity** of table design in relational systems

#### Pros
- Scalable and highly available—many NoSQL databases are generally designed to support seamless, online horizontal scalability without significant single points of failure.
- **Flexible data models** — most non-relational systems do not require developers to make up-front commitments to data models; what schemas do exist can often be changed on the fly.
- High performance—by limiting the range of what the database can do (for example, by relaxing durability guarantees) many NoSQL systems are able to achieve extremely high levels of performance.
- **High-level data abstractions**—moving beyond the "value in a cell" data model, NoSQL systems can provide high-level APIs for powerful data structures. Redis, for example, includes a native-sorted set abstraction

#### Cons
- Vague interpretations of ACID constraints—despite widespread claims of ACID support for NoSQL systems, the interpretation of ACID is often made so broad that not much can be gleaned about the semantics of the database in question. For example, what does "isolation" mean without transactions?
- Distributed systems have distributed systems problems. While not unique to NoSQL systems, it's the norm, rather than the exception, for developers programming against NoSQL to deeply understand, e.g., CAP Theorem and its interpretation by the database in question.
- **Lack of flexibility in access patterns**—the relational/SQL abstraction gives the database engine broad powers to optimize queries for the underlying data; without that abstraction, the on-disk representation of data leaks into the application's queries and leaves no room for the engine to optimize.

### Considering SQL when<sup>**</sup>

- Your data is highly structured, and that structure doesn’t change frequently
- You support transaction-oriented systems such as accounting or financial applications
- You require a high degree of data integrity 5 and security
- You routinely perform complex queries, including ad hoc requests
- You don’t require the scale-out capabilities that NoSQL offers

### Considering NosQL when<sup>**</sup>

- You’re working with large amounts of unstructured or semi-structured data that doesn’t fit the relational model
- You require the flexibility of a dynamic schema or want more choice over the data model
- You require a database system that can be scaled horizontally, perhaps across multiple geographic locations
- You want to streamline development and avoid the overhead of a more structured approach
- Possibly Your applications don’t require the level of data integrity
offered by SQL databases 1 HARD TO SAY

### Analysis on data usages

#### Data size
The data size of a one-year project with 5 reports is about 50KB. Even though hundreds of projects are active in a year, the yearly data increase is less than 100MB. Therefore, NoSQL's horizontal scale-out capability and SQL's reducing storage usage by normalization should not impact our choice.

#### Transaction and ACID

Is our system transactional or non-transactional? It depends on how we design entities like projects and reports. For example, if we relate the status fields of a report to the status of a project in the way of the computed pattern, then we might need transactions. But if we embed reports into a project document, we do not.
Even if the transactional features are indispensable, it does not matter because MongoDB supports transactions<sup>***</sup>.

#### Query patterns

##### Master view
  Master view lists all projects with basic project information such as name, identity number, and ministry from the project, and progress, comments, financials data, and four status fields from the last report. We can set up this view both in SQL and NoSQL(MongoDB) databases.
  
##### Queries based on Master view
  Most queries are performed on Master view. For example, a pie chart can be drawn by the query of the number of projects by status. These queries for both databases are very alike. 

##### Complex queries
  At this point, we can't figure out how complicated queries we will need, but this could be an example. 
  Let us suppose that we are looking for a project that shows an irregular trend of spending. We can visualize it by the congregated line charts of each project's spending. This does not seem simple because each project can have a different number of reports, and we also have to consider each project's budget could be bumped up at a certain point in time.
  Whichever database we are using, we may have to run multiple queries and need data processing both at the backend and the frontend. After all, there might be a higher possibility in NoSQL that we need additional API endpoints. 

##### Usage analysis<sup>1)</sup>
  The following cases need separate data models not related to the reporting data, and it has to be discussed whether they are in scope or not.
  - How many updates are done in a report
  - How many communications are done for a report
  - How many logins are in a reporting season
  - How long time users spend on each page or form

##### Ad-Hoc Queries
  If data analysts use only SQL when we adopted NoSQL, we may need to update APIs more frequently. It might be an issue of operation and management, not architecture.

### Conclusion

It would not be significantly different whether we choose SQL or NoSQL databases because of the small number of data entities, relations, and transactions. Considering the project aims for Proof of Concept by prototyping, flexibility in data models is the key feature of NoSQL we could benefit from.

### References

\* [A look SQL and NoSQL databases, their differences, and which option would be best for your situation](https://www.ibm.com/cloud/blog/sql-vs-nosql)

** [How to choose between SQL and NoSQL databases
](https://www.red-gate.com/simple-talk/databases/nosql/how-to-choose-between-sql-and-nosql-databases/?utm_source=simpletalk&utm_medium=pubemail&utm_campaign=st2&utm_content=20210511-slota2)

*** [How to Use MongoDB Transactions in Node.js](https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions)

---
# UI Frameworks

## MaterialUI

Pros:
- Robust component library
- Includes components for interactive UI features that will save time without compromising on user experience
- Extensive icon library available (note: icons are a separate package from material-ui)
- Supports custom styles and themes
- Good documentation with examples provided in a sandbox environment to experiment with
- Designed to work with React framework
- Responsive

Cons:
- MaterialUI is easily identifiable due to popularity; can be restrictive on branding
- Some slight usability issues have been noted due to floating action buttons only having space for icons and no assistive text.

### Conclusion
MaterialUI has components that meet the needs of our project and align with our design goals. The excellent documentation will help the team gain a clear understanding of how to use the framework in a short amount of time. The customization issues noted are not believed to be a hinderance to achieving the desired look and feel of a BC Gov application.

**Sources**
- [why use material design](https://www.toptal.com/designers/ui/why-use-material-design)
- [Best React JS CSS UI Components Library](https://holycoders.com/list-of-react-ui-library-and-frameworks/)

---
## Data Visualization Libraries

#### D3 - Data-Driven Documents

**Pros:**
- Provides not only data visualization, but also animations, data analysis, geo, and data utilities
- Very robust with lots of features, little need to use additional libraries for data visualization
- Works with any language or framework

**Cons:**
- API exposes direct access to DOM which can clash with frontend frameworks like Vue or React
- Steep learning curve
- Documentation is outdated and difficult to navigate

**Sources**
- [d3 website](https://d3js.org/)

#### Recharts

**Pros:**
- Easy to use with easy to read documentation
- Data visualization library for React, uses D3
- Static chart performance is good

**Cons:**
- Performance issues when dealing with multiple animated charts
- Large amount of unresolved issues on GitHub
- Only for React

**Sources**
- [recharts github](https://github.com/recharts/recharts)
- [recharts website](https://recharts.org/en-US/)

### Victory

**Pros:**
 - need to list pros

**Cons:**
- Only for React and React Native

**Sources**
- [victory github](https://github.com/FormidableLabs/victory)
- [victory gallery](https://formidable.com/open-source/victory/gallery/)