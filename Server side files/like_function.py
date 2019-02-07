from __future__ import print_function
import sys
import flask
from flask import jsonify, make_response
from flask import Flask
from flask import request
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
import pandas as pd
import numpy as np
import random

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'yelp'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/yelp'
app.config['APISPEC_FORMAT_RESPONSE'] = False
mongo = PyMongo(app)

def like(business_id, user_id):
    
    business = mongo.db.business

    new_keys = business.find_one({'business_id':business_id},{'categories':1, '_id':0})['categories']
    if new_keys is not None:
        new_keys = new_keys.split(', ')
    user_profile = mongo.db.user_profile
    keys = user_profile.find_one({'name':user_id},{'keywords':1,'_id':-1})['keywords']
    print(len(keys))
    s = set(keys)

    categories = mongo.db.categories
    times = 0
    #find a not very frequent word
    while len(s) < 20 and new_keys is not None and times < 10:
        rand = random.randint(0,len(new_keys)-1)
        if categories.find_one({"word":new_keys[rand]})['count'] < 200:
            s.add(new_keys[rand])
            new_keys.pop(rand)
            break
        times +=1
    times = 0
    #find a frequent word
    while len(s) < 20 and new_keys is not None and times < 10:
        rand = random.randint(0,len(new_keys)-1)
        if categories.find_one({"word":new_keys[rand]})['count'] > 700:
            s.add(new_keys[rand])
            new_keys.pop(rand)
            break
        times +=1
    times = 0
    while len(s) < 20 and new_keys is not None and times < 10:
        rand = random.randint(0,len(new_keys)-1)
        r = categories.find_one({"word":new_keys[rand]})
        if  r['count']<= 700 and r['count']>=200:
            s.add(new_keys[rand])
            new_keys.pop(rand)
            break
        times +=1
    
    while(len(s) >= 21):
        s.drop(0)

    print(s)
    s = list(s)
    return user_profile.update_one({'name': 'Yimeng'},{'$set':{'keywords':s}})