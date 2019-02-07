from __future__ import print_function
import sys
import flask
from flask import jsonify, make_response
from flask import Flask
from flask import request
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps

# to get recommendations
import pandas as pd
import numpy as np
#import math
def final_5_recommendations_function(input_user_id):
    
    # check if the data has been imported already
    if( not (('df' in locals()) or ('df' in globals())) ):
#        continue
#    else:
        # import data

        ##### import ratings #####
        app = Flask(__name__)
        app.config['MONGO_DBNAME'] = 'yelp'
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/yelp'
        app.config['APISPEC_FORMAT_RESPONSE'] = False
        mongo = PyMongo(app)

        review_all = mongo.db.reviews
        result = review_all.find()#.limit(10000)

        user_id = []
        business_id = []
        stars = []

        for item in result:
            user_id.append(item['user_id'])
            business_id.append(item['business_id'])
            stars.append(item['stars'])

        df1 = pd.DataFrame()
        df1['user_id'] = user_id
        df1['business_id'] = business_id
        df1['stars'] = stars

        ##### import business names #####

        app = Flask(__name__)
        app.config['MONGO_DBNAME'] = 'fall2018'
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/yelp'
        app.config['APISPEC_FORMAT_RESPONSE'] = False
        mongo = PyMongo(app)

        review_all = mongo.db.business
        result = review_all.find()

        business_id = []
        business_name = []

        for item in result:
            business_name.append(item['name'])
            business_id.append(item['business_id'])

        df2 = pd.DataFrame()
        df2['business_id'] = business_id
        df2['business_name'] = business_name
        
        df = pd.merge(df1, df2, on='business_id')

    # end of else
    
    # check if the user_business_matrix is avilable
    # delete this table once a day/hour so that fresh table is computed often
    if( not (('user_business_matrix' in locals()) or ('user_business_matrix' in globals())) ):
#        continue
#    else:
        # group by stars of a business 
        cumulative_star_table = pd.DataFrame(df.groupby('business_id')['stars'].mean())

        # add new column to track number of stars
        cumulative_star_table['number_of_cumulative_star_table'] = df.groupby('business_id')['stars'].count()

        # create the pivot table
        user_business_matrix = df.pivot_table(index='user_id', columns='business_id', values='stars')
    # end of else
    
    # find 3 highest rated business by this suer
    
    # get user id from front end and find 3 highest rated business of this user
    temp_view = df[df['user_id'] == input_user_id].sort_values(by='stars', ascending=False)
    temp_view = temp_view[temp_view['stars'] >= 0].sort_values(by='stars', ascending=False).head(3)
    
    if(len(temp_view.index) < 3):
        err_msg = 'need atleast 3 rated restaurants'
        return err_msg

    # find 5 business most similar to Business1
    Business1 = temp_view['business_id'][temp_view.index[0]]
    Business1_user_stars = user_business_matrix[Business1]

    # find businesses similar to business 1 using the business matrix
    similar_to_Business1 = user_business_matrix.corrwith(Business1_user_stars)

    # drop all the rows containing null values for correlation
    corr_Business1 = pd.DataFrame(similar_to_Business1, columns=['correlation'])
    corr_Business1.dropna(inplace=True)

    # add number of stars to this table
    corr_Business1 = corr_Business1.join(cumulative_star_table['number_of_cumulative_star_table'])

    # extract the business that is above 50% percentile in the correlation and sort it by stars
    Business_similar_to_Business1 = corr_Business1[corr_Business1['correlation'] > corr_Business1.describe()['correlation'][-3]].head(5)

    # find 5 business most similar to Business2
    Business2 = temp_view['business_id'][temp_view.index[1]]
    Business2_user_stars = user_business_matrix[Business2]

    # find businesses similar to business 1 using the business matrix
    similar_to_Business2 = user_business_matrix.corrwith(Business2_user_stars)

    # drop all the rows containing null values for correlation
    corr_Business2 = pd.DataFrame(similar_to_Business2, columns=['correlation'])
    corr_Business2.dropna(inplace=True)

    # add number of stars to this table
    corr_Business2 = corr_Business2.join(cumulative_star_table['number_of_cumulative_star_table'])

    # extract the business that is above 50% percentile in the correlation and sort it by stars
    Business_similar_to_Business2 = corr_Business2[corr_Business2['correlation'] > corr_Business2.describe()['correlation'][-3]].head(5)

    # find 5 business most similar to Business1
    Business3 = temp_view['business_id'][temp_view.index[2]]
    Business3_user_stars = user_business_matrix[Business3]

    # find businesses similar to business 1 using the business matrix
    similar_to_Business3 = user_business_matrix.corrwith(Business3_user_stars)

    # drop all the rows containing null values for correlation
    corr_Business3 = pd.DataFrame(similar_to_Business3, columns=['correlation'])
    corr_Business3.dropna(inplace=True)

    # add number of stars to this table
    corr_Business3 = corr_Business3.join(cumulative_star_table['number_of_cumulative_star_table'])

    # extract the business that is above 50% percentile in the correlation and sort it by stars
    Business_similar_to_Business3 = corr_Business3[corr_Business3['correlation'] > corr_Business3.describe()['correlation'][-3]].head(5)
    
    final_5_recommendations = Business_similar_to_Business1.index.append(
                              Business_similar_to_Business2.index.append(
                              Business_similar_to_Business3.index))
    final_5_recommendations = list(set(final_5_recommendations))[:5]
    
    return final_5_recommendations