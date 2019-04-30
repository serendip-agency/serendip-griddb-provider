
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/m-esm/serendip/graphs/commit-activity)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://serendip.agency/)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)
![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)


## Serendip GridDb Provider
### What is serendip GridbDb ?
It's a set of nodes and controllers communicating and syncing with each other creating a grid of stand-alone MongoDB databases that are both secure and reliable in a condition you might want to switch between cloud and on-premises infrastructure. 

It's secure because every successful write/update/delete operation will run on a unique twin of grid-nodes which will decrease risk of data loss to almost zero.

It's highly reliable because you will be able to access your data through multiple controllers which can query your data from at least two nodes in-case-of failure. 

![SG](https://raw.githubusercontent.com/serendip-agency/serendip-griddb-provider/master/serendip-griddb.jpg " ")


### Installing
Assuming that you have already installed Nodejs, you can start installing Serendip with NPM.
Open your Terminal/Command Prompt(CMD) and write:

```
npm install serendip-griddb-provider --save
```


### Testing
In order to test this package you need to have grid nodes and controllers up and running.
you can follow these steps to start testing

1. open new terminal and clone griddb-node source 
```

 git clone git@github.com:serendip-agency/serendip-griddb-node.git; \
 cd serendip-griddb-node
 sudo npm i 
 sudo gulp \
   -e db.mongoUrl=mongodb://localhost:27017;
 # -e db.authSource=admin \
 # -e db.user=root \
 # -e db.password=replace_me;

```

2. open new terminal and clone griddb-controller source
```

 git clone git@github.com:serendip-agency/serendip-griddb-controller.git 
 cd serendip-griddb-controller  
 sudo npm i 
 sudo gulp  
```

3. open new terminal and clone griddb-provider source
```
 git clone git@github.com:serendip-agency/serendip-griddb-provider.git
 cd serendip-griddb-controller
 sudo npm i 
 sudo npm test
```

#### Normal test result
```
  find scenarios
    ✓ should do simple find (207ms)
    ✓ should do $gte find (207ms)
    ✓ should do $elemMatch find on subarray (205ms)
    ✓ should do $elemMatch find on sub object-array (212ms)

  init scenarios
    ✓ should do simple initiate
    ✓ should get grid stats

  insert scenarios
    ✓ should do simple insert (105ms)
    ✓ should get simple insert event (97ms)
    ✓ should do insert with custom id (96ms)

  update scenarios
    ✓ should return updated (104ms)
    ✓ should upsert (103ms)
    ✓ should get update event (103ms)
    ✓ should do more upserts (132ms)

```


### usage Example


```typescript
import { start, DbService } from('serendip')
import { GriddbProvider}  from('serendip-griddb-provider')

DbService.configure({
  defaultProvider: "Griddb",
  providers: {
    Griddb: {
      object:   GriddbProvider ,
      options: {}
    }
  }
});    

start({
  logging:  "info",
  cpuCores:  1,
  services: [ DbService ]
})
  .then( () => { console.log('started successfully');  })
  .catch( (msg) => { console.log(msg); } );


```
#### Collaboration, issue reporting kindly accepted.
![_](https://serendip.agency/assets/svg/about/about-7.svg "")
 