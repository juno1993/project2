#!/bin/bash

#npm run build:master
#aws s3 rm s3://pj2-phone --recursive
aws s3 cp dist/. s3://pj2-phone/ --recursive

