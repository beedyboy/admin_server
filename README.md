#A Notification system for hospitals
#
#
#Dev Requirements
#
#Knex
#Express
#shortId
#Nodejs


#*****************************API*********************
#
#--------------Packages-----------------#
#api/subscription  ####[POST] ###Create subscription package
#api/subscription  ####[GET] ###get subscription list
#api/subscription/{plan}  ####[GET] ###Check subscription name exist

#--------------Institution Account/Login-----------------#
#api/account  ####[POST] ###Create Institution account
#api/account  ####[GET] ###Check Institution email exist
#api/account/verify  ####[POST] ###Activate Institution account
#api/account/auth  ####[POST] ###Admin Login

#--------------Department-----------------#
#api/department/{company}  ####[GET] ###List all department in the Institution
#api/department/{company}/{name}/exist  ####[GET] ###Check department exist under same Institution. Using dept name
#api/department/{company}/{name}  ####[GET] ###Get department info in an Institution.
#api/department  ####[POST] ###Create department
#
#--------------Staff-----------------#
#api/staff/{company}  ####[GET] ###List all department in the Institution
#api/staff/{company}/{name}/exist  ####[GET] ###Check department exist under same Institution. Using dept name
#api/staff/{company}/{name}  ####[GET] ###Get department info in an Institution.
#api/staff  ####[POST] ###Create department
#


"# admin_server" 
