
import sys
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import random

def convert_to_df(rows, cols, ratings):
    newRows = []
    newCols = []
    newRatings = []
    for i in range(len(rows)):
        if (i % 2 == 0):
            newRows.append(rows[i])

    for i in range(len(cols)):
        if (i % 2 == 0):
            newCols.append(cols[i])

    for i in range(len(ratings)):
        if (i % 2 == 0):
            newRatings.append(ratings[i])   
    df = pd.DataFrame(0, columns=newCols, index=newRows)
    index = 0
    while index < len(newRatings):
        df.loc[newRatings[index], newRatings[index + 1]] = newRatings[index + 2]
        index += 3
    return df.astype(float)

def reccommend_outfit(df):
    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(df.values)
    distances, indices = knn.kneighbors(df.values, n_neighbors=3)

    # Calculate pearson correlation to find shirts similar to current shirt
    pearsoncorr = df.transpose().corr(method='pearson')
    # print(pearsoncorr)
    neighbors = pearsoncorr.apply(lambda s: pd.Series(s.nlargest(3).index)) # top 3 nearest neighbor

    # Pick a random shirt or have user input a shirt
    # get the index for 'movie_0'
    shirt_index = random.randint(0,len(df) - 1)
    # print("neighbors", neighbors)
    # Get similarity values of 2 nearest neighbors
    neighbor_one = neighbors.iloc[1][shirt_index]
    neighbor_two = neighbors.iloc[2][shirt_index]
    neighbor_one_index = pearsoncorr.index.tolist().index(neighbor_one)
    neighbor_two_index = pearsoncorr.index.tolist().index(neighbor_two)

    # Randomly pick a bottoms where higher rated bottoms combined with the shirt is more likely to be chosen
    # Fill in empty cells of row --> should I precompute it? --> maybe i'll update it as I go 
    # print(shirt_index, len(df.iloc[shirt_index]))
    # print(df)
    for bottom_index in range(len(df.iloc[shirt_index])):
        if df.iloc[shirt_index][bottom_index] == 0:
            sim_neighbor_one = pearsoncorr.iloc[shirt_index][neighbor_one_index]
            sim_neighbor_two = pearsoncorr.iloc[shirt_index][neighbor_two_index]
            rating_neighbor_one = df.iloc[neighbor_one_index][bottom_index]
            rating_neighbor_two = df.iloc[neighbor_two_index][bottom_index]
            # print("sim_neighbor_one", sim_neighbor_one.isnumeric())
            # print("rating_neighbor_one", rating_neighbor_one.isnumeric())
            if rating_neighbor_one == 0 and rating_neighbor_two == 0:
                continue
            if rating_neighbor_one == 0:
                sim_neighbor_one = 0
            if rating_neighbor_two == 0:
                sim_neighbor_two = 0
            # Take 2 nearest neighbors and calculate its predicted value using similarity weights
            # (sim_x * rating_x + sim_y * rating_y) / (sim_x + sim_y)
            pred_rating = (sim_neighbor_one * rating_neighbor_one + sim_neighbor_two * rating_neighbor_two) / (sim_neighbor_one + sim_neighbor_two)
            df.iloc[shirt_index][bottom_index] = pred_rating

    # Choose random bottom using weights
    # Source: https://www.geeksforgeeks.org/how-to-get-weighted-random-choice-in-python/
    # print(df.iloc[shirt_index].index)
    # If all weights are zero, then we randomly choose a bottom
    # print(df.iloc[shirt_index].index)
    if (df.iloc[shirt_index].sum() == 0):
        # Choose a random bottom
        bottoms_name = random.choice(df.iloc[shirt_index].index)
    else:
        bottoms_name= random.choices(df.iloc[shirt_index].index, weights=df.iloc[shirt_index], k=1)[0]

    # randomList = random.choices(df.iloc[shirt_index].index, weights=df.iloc[shirt_index], k=1)


    # # Get shirt name from shirt_index
    shirt_name = df.index[shirt_index]
    print(shirt_name, bottoms_name)

if __name__ == "__main__":
    # Takes first name and last name via command 
    # line arguments and then display them
    shirt_id_list = sys.argv[1]
    bottom_id_list = sys.argv[2]
    rating_list = sys.argv[3]
    df = convert_to_df(shirt_id_list, bottom_id_list, rating_list)
    reccommend_outfit(df)
    sys.stdout.flush()