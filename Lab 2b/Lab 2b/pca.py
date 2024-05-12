from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
import json
from sklearn.preprocessing import MinMaxScaler
from kneed import KneeLocator
app = Flask(__name__)
from sklearn.cluster import KMeans
from sklearn.manifold import MDS
from sklearn.metrics import mean_squared_error
from scipy.spatial.distance import cdist, pdist
from sklearn.preprocessing import LabelEncoder
CORS(app)

@app.route('/api/data')
def get_data():

    raw_dataset = pd.read_csv('E:\Dataset.csv')
    print(raw_dataset.columns)


    categorical_cols = ['Gender', 'Education', 'Income']

    categorical_cols = ['Gender', 'Education', 'Income']

# Initialize a LabelEncoder for each categorical column
    for col in categorical_cols:
        le = LabelEncoder()
    # Fit and transform the column and replace it in the dataset
        raw_dataset[col] = le.fit_transform(raw_dataset[col])




    colnames= raw_dataset.columns.tolist()

    columns_to_remove = {'Gender','Education','Income'}
    num_colnames = [col for col in colnames if col not in columns_to_remove]

   

    dataset = raw_dataset.drop(['Gender','Education','Income'], axis=1)

    scaler = MinMaxScaler()
    scaler.fit(dataset)
    data = scaler.transform(dataset)
    # pca = PCA(n_components=10)
   
    # pc_data = pca.fit_transform(data)
  

  
    # eigenvalues = pca.explained_variance_ratio_

    # ratio  =np.cumsum(pca.explained_variance_ratio_)


    # eigenvectors =pca.components_


    # indexes=[]

    # for k in range(1, 13):
    #     loadings = pca.components_[:k].T*np.sqrt(pca.explained_variance_[:k])
  
    #     df_loading  = pd.DataFrame(loadings,index=colnames)
    #     df_loading["sum_loadings"]= np.sum(df_loading,axis=1)
    #     df_loading = df_loading.sort_values(by = ["sum_loadings"],ascending= False)
    #     top4_attr= df_loading.index[0:4].tolist()

    #     indexes.append([colnames.index(x) for x in  top4_attr])
   







    results = []
    res=[]
    for k in range(1, 11):
       
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(data)
        
       
        cluster_labels = kmeans.labels_
 
        cluster_centers = kmeans.cluster_centers_

        mse = mean_squared_error(data, cluster_centers[cluster_labels])
        

        results.append({'k': k, 'MSE': mse, 'cluster_labels': cluster_labels.tolist() })



    kmeans = KMeans(n_clusters=3, init='k-means++')
    kmeans.fit(data)
    cluster_labels = kmeans.labels_


        
    embedding = MDS(n_components=2)
    mds_data=embedding.fit_transform(data)

    embedding = MDS(n_components=2, dissimilarity='precomputed')
    dissimilarities = cdist(data.transpose(), data.transpose(), 'correlation')
    mds_var= embedding.fit_transform(dissimilarities)

    json_data = json.dumps({ "full_dataset":raw_dataset.values.tolist(),"dataset":dataset.values.tolist(),"full_col":colnames,"numeric_col":num_colnames,"mds_data":mds_data.tolist(),"mds_var":mds_var.tolist(),"cluster_labels": cluster_labels.tolist(),"kmeans": results})







    
   



    





   
    # json_data = json.dumps({"pca":pc_data.tolist(), "evalue":eigenvalues.tolist(),"ratio": ratio.tolist(),"top":df_loading.index[0:4].tolist() , "index": indexes, "eigenvectors": eigenvectors.tolist(),"dataset":data.tolist(),"kmeans": results,"col":colnames
                            
                            
                            
    #                         ,mds_data:mds_data.tolist()})
   
    return json_data

if __name__ == '__main__':
    app.run(debug=True)