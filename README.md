# Creating an English proficiency test using a decision tree
## Overview
This project attempts to build a functional English proficiency test from a sparse dataset consisting of user interactions with multiple choice questions. It began by exploring and refining the available data, moved on to proving that a machine learning model can predict proficiency based on that data, then culminated (for the purposes of this repository) in the deployment of a [Web application](https://mln-alpha.web.app/).

This repository is a capstone project deliverable for the [Udacity Data Science Nanodegree](https://www.udacity.com/school-of-data-science). All work was done by Evan Quinlan, including data analysis, data pipeline construction, Web application development, and Web application deployment, during enrollment in the nanodegree program. Work was done while employed by Transparent Language, the proprietor of the data, and is shared publicly and submitted to Udacity with permission of Transparent Language. Please see the [License](#License) section for more information.

## Problem
While I was enrolled in the nanodegree program, a unique data science problem fell into my lap that fit the requirements for a capstone project.

The CEO of the company I work for as Director of Product, [Transparent Language](https://www.transparent.com/), wanted to know if an English proficiency test could be created based on data generated by the company's English language game, [_Which Is English?_](https://whichisenglish.transparent.com/). The game challenges players to answer binary questions about the English language then provides them with a score, which may be posted on a leaderboard. A good score, however, doesn't necessarily reflect true English knowledge, since players may have memorized answers or sped through the game to increase their points. The CEO did not want to devote "official" company resources to this endeavor, so he allowed me to pursue it personally and in an "unofficial" capacity, agreeing to let me share the work as long as I respected proprietary company information.

The question is, **can data generated by the game form the basis of an English proficiency test?** And moreover, can this be done more efficiently than traditional [computerized adaptive testing](https://en.wikipedia.org/wiki/Computerized_adaptive_testing) techniques would allow?

What "proficiency test" means to some may differ wildly from what it means to others, but in its broadest sense, it is a series of questions (preferably adaptive) which, after being answered (or skipped, as allowed), indicate the degree of some relative, latent ability in the test-taker. The test need only measure _some kind of English language ability_, so the answer does not depend on testing all four major language skills, namely reading, writing, listening, and speaking.

## Solution
To solve this problem, I will do a little innovating and **try to build a decision tree that can be dissected and treated as an adaptive English proficiency test.** The steps I took were:

1. Explore available data from a MySQL database
2. Extract and explore relevant data
3. Fill in sparse data with Funk SVD, creating a matrix of predictions of how well each user will answer each item
4. Use predictive data to create target variables representing user English proficiency scores
5. Train and test a decision tree
6. Use the decision tree structure to build an adaptive test

The idea is, I present each node of the decision tree as a test question. Upon receiving an answer, I follow the tree's internal logic to choose the next question. Just like in a traditional adaptive test, questions with the most information (i.e. best ability to discriminate users by their latent ability) are presented first.

## Test generation
### Libraries
- [Matplotlib](https://matplotlib.org/)
- [MySQL](https://www.mysql.com/)
- [Numpy](https://numpy.org/)
- [pandas](https://pandas.pydata.org/)
- [scikit-learn](https://scikit-learn.org/stable/)
- [Scipy](https://www.scipy.org/)
- [Surprise](http://surpriselib.com/)

Although unused in this project, to employ the fallback strategy of computerized adaptive testing, I'd use the excellent [catsim](https://douglasrizzo.com.br/catsim/) library.

Code is written in [Python](https://www.python.org/) 3.7.

### Metrics
I use a decision tree algorithm to solve my problem. The metrics used are these:

1. **The [coefficient of determination](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html#sklearn.tree.DecisionTreeRegressor.score)** as a general accuracy indicator for the regressor
2. **Mean error:** I want to generate a test that is not just statistically accurate, but also likely to be accurate for each individual test-taker. This means a low mean error is critical.
3. **Max error:** I need to know the worst case scenario for a test-taker.
3. **Tree depth:** I want to try and generate a test of a reasonable length, which correlates directly with tree depth.

More information on why these metrics were chosen can be found in the [Methodology notebook](Methodology.ipynb#A-decision-tree-with-items-as-nodes).

### Results
#### Reflection
The approach I took was a little unorthodox. There's a lot of expertise on the subject of computerized adaptive testing, and using a decision tree as an adaptive test is an "out-there" approach that might offend the sensibilities of some. However, what I've created seems to have some face validity at least. I won't know if what it really measures until it's compared with some other, more established English proficiency testing scale. In the meantime, however, the scale of [20, 120] seems to be useful. If the approach turns out not to be viable, I can always fall back to implementing more traditional approaches using [item response theory](https://en.wikipedia.org/wiki/Item_response_theory).

Solving this problem has been a series of ups and downs. Machine learning tools are all sufficiently abstract that using something like Funk SVD to create an adaptive English proficiency test is possible, but there are no handbooks for applying those tools for that purpose. That made the most difficult part of this project imagining, from scratch, how the various methods and techniques with which I was familiar could be applied to a domain I had never seen them used for (although, just because I haven't seen it...). For instance, the method of using the item bias generated by SVD as a stand-in for item difficulty—which would normally be determined scientifically or by panels of experts—needed a lot of validation before I was convinced it wasn't an insane approach to take.

#### Improvement
Decision tree regressors have the drawback that they cannot be truly adaptive; once you're on a branch, you're stuck between the minimum and maximum values offered by that branch's leaves. However, if the inputs to the tree are valid enough, then that might not be a show-stopping issue.

Some things I'd like to try going forward:
- Train separate models for native and non-native English test-takers, since they may exhibit very different properties.
- Choose an optimal [bucket size](Methodology.ipynb#A-decision-tree-with-buckets-of-items-as-nodes) for delivering clusters of items as test challenges.
- Train the model on actual, possible answers based on bucket size (for instance, for a bucket size of seven, round all training inputs to the nearest seventh).
- Try creating buckets using truncated SVD. Bucketing items based on their difficulty is logically sound, but some items have specific properties that cause certain test-takers to respond differently to them than others. What if we should really be grouping items based on the grammatical principles they test? Those are the kinds of latent factors that truncated SVD might be able to discover.
- Include the first encounters between _Which Is English?_ users and items that are timeouts, as I left them out of my data, and they have value as wrong answers. Without them, my training data is essentially incomplete.

## Web application
### Overview
A Web application implements the "state-of-the-art" version of the adaptive test conceived by the end of [the Methodology notebook](Methodology.ipynb).

The application presents a test generated by a decision tree then presents the user with their score. The test was built from the nodes of the decision tree, each of which represents a bucket of seven _Which Is English?_ items.

### Libraries
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [AngularFire](https://github.com/angular/angularfire)
- [Firebase](https://firebase.google.com/)

### Implementation Notes
Timeouts are considered incorrect.

Test results are logged in a back-end database, but no user data is collected. Users are [authenticated anonymously](https://firebase.google.com/docs/auth/web/anonymous-auth) using Firebase.

### Link
[My Language Number (Prototype)](https://mlna-udacity.web.app/)
Hosted by Firebase

## Files
### Exploration and Methodology
There are two primary notebooks:

- [Exploration](Exploration.ipynb)—The data is examined
- [Methodology](Methodology.ipynb)—All steps from assembling data through training the model

The `data` folder contains queries and data and samples of data queried from a MySQL database:

- Queries
-- [`first_encounters.sql`](data/first_encounters.sql)—Yields first encounters between _Which Is English?_ users and items
-- [`testitem_active_est_rating.sql`](data/testitem_active_est_rating.sql)—Yields estimated item ratings provided by Transparent Language
- Data
-- [`first_encounters.zip`](data/first_encounters.zip)—Contains `first_encounters.csv`, a large file that must be unzipped.
-- [`testitem_active_est_rating.csv](data/testitem_active_est_rating.csv)—The uncomfirmed relative difficulty ratings of _Which Is English?_ items
- Data samaples (not shared in total for proprietary reasons)
-- [`testings_completedtestitem_head.txt`](data/testings_completedtestitem_head.txt)—TSV interactions between _Which Is English?_ users and items
-- [`testings_testitem_head.txt`](data/testings_testitem_head.txt)—TSV _Which Is English?_ item data, including correct and incorrect answer text

_NOTE: `first_encounters.csv` has to be extracted from [`first_encounters.zip`](/data/first_encounters.zip) and placed in the `/data` directory to be properly referenced by notebooks._

### Web Application
The [`mlna-web`](mlna-web) directory contains the Angular application that deploys the test.

The reformatted tree nodes and question data can be found in [`mlna-web/src/assets`](mlna-web/src/assets) as [`node_data.json`](mlna-web/src/assets/node_data.json) and [`item_data.json`](mlna-web/src/assets/item_data.json), respectively.

## Acknowledgements
Data for this project was provided by [Transparent Language](https://www.transparent.com/). _Which Is English?_ items were authored asynchronously by multiple authors employed by Transparent Language. Special thanks to Michael Quinlan, President and CEO, for giving me the opportunity to pretend to be a real-life data scientist for a bit.

## License
Default copyright laws apply, and no one may reproduce, distribute, or create derivative works without permission.
