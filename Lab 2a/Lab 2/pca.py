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
from sklearn.metrics import mean_squared_error
CORS(app)

@app.route('/api/data')
def get_data():

    dataset = pd.read_csv('E:\data1.csv')
    colnames= dataset.columns.tolist()

    scaler = MinMaxScaler()
    scaler.fit(dataset)
    data = scaler.transform(dataset)
    pca = PCA(n_components=10)
   
    pc_data = pca.fit_transform(data)
  

  
    eigenvalues = pca.explained_variance_ratio_

    ratio  =np.cumsum(pca.explained_variance_ratio_)


    eigenvectors =pca.components_


    indexes=[]

    for k in range(1, 13):
        loadings = pca.components_[:k].T*np.sqrt(pca.explained_variance_[:k])
  
        df_loading  = pd.DataFrame(loadings,index=colnames)
        df_loading["sum_loadings"]= np.sum(df_loading,axis=1)
        df_loading = df_loading.sort_values(by = ["sum_loadings"],ascending= False)
        top4_attr= df_loading.index[0:4].tolist()
        # indexes=[colnames.index(x) for x in  top4_attr]
        indexes.append([colnames.index(x) for x in  top4_attr])
   







    results = []
    res=[]
    for k in range(1, 11):
        # Fit K-means clustering model
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(data)
        
        # Get cluster labels
        cluster_labels = kmeans.labels_
        
        # Calculate cluster centroids
        cluster_centers = kmeans.cluster_centers_
        
        # Calculate Mean Squared Error (MSE)
        mse = mean_squared_error(data, cluster_centers[cluster_labels])
        
        # Store results for this k value
        results.append({'k': k, 'MSE': mse, 'cluster_labels': cluster_labels.tolist() })

    #kn = KneeLocator(range(1, 13), res, curve='convex', direction='decreasing')







    
   



    





   
    json_data = json.dumps({"pca":pc_data.tolist(), "evalue":eigenvalues.tolist(),"ratio": ratio.tolist(),"top":df_loading.index[0:4].tolist() , "index": indexes, "eigenvectors": eigenvectors.tolist(),"dataset":data.tolist(),"kmeans": results,"col":colnames})
   
    return json_data

if __name__ == '__main__':
    app.run(debug=True)