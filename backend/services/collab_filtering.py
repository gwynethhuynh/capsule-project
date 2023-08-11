
import sys
# Takes first name and last name via command 
# line arguments and then display them
print("Output from Python")
shirt_id_list = sys.argv[1]
bottom_id_list = sys.argv[2]
rating_list = sys.argv[3]
print("SHIRTS", sys.argv[1])
print("BOTTOMS", sys.argv[2])
print("RATINGS", sys.argv[3])
# for i in range(len(sys.argv[1])):
#     print("SHIRT", sys.argv[1][i])
# # print("First name: " + sys.argv[1])
# # print("Last name: " + sys.argv[2])
# for i in range(len(sys.argv[2])):
#     print("BOTTOM", sys.argv[2][i])

# for i in range(len(sys.argv[3])):
#     if (i % 2 == 0):
#         print("RATING", sys.argv[3][i])  
    
# save the script as hello.py
sys.stdout.flush()