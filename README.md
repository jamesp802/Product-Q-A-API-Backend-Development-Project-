# Questions and Answers API
James Prytherch

## Overview:

The goal is to update the backend for an existing product information portal. Several millions of entries already exist and thus must be included in the new database.

This application shows an understanding of server development, routing, and data management using MySQL and custom models.

A key challenge of this project is working with large legacy datasets, and that the front end was built to suit a suboptimal API.  This constrains, or complexes the development of an efficient backend because the front end will expect to receive data in a certain format which cannot be changed.

## Challenge:
### Develop a backend API pertaining to an existing Questions and Answers Front End.

- ETL Legacy Data
- Merge data to new MySQL server
- Emphasize efficiency, scalability while working within constraints of Front End's expected data format
- Stress Testing and Optimization

### Final Stress Test: 75,000RPS/1 Minute

<img src="https://imgur.com/76PWwJf.png"/>


engineering journal documenting some key decisions:
https://gist.github.com/jamesp802/374ad27d90680156f93d03096edb766c
