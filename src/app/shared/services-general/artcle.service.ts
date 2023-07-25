import { Injectable, NgZone } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, setDoc, where,  query, getDoc, getDocs, doc, CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Article, COLLECTION_NAME } from '../models-general/general-model';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

    constructor(
        private ngZone: NgZone,
        private firestore: Firestore
    ) {}

    articleAdd (article : Article): Observable<DocumentReference> {
        const myCollectionRef: CollectionReference = this.getCollectionReference( COLLECTION_NAME.article);
          const userPromise : Promise<DocumentReference> =  addDoc(myCollectionRef, article);
          return from(userPromise);
      }

      getArticle (articleUid : string): Observable<Article| null> {
        const articleRef = doc(this.firestore, COLLECTION_NAME.article, articleUid);
        const docSnapshot : Promise<DocumentSnapshot> =  getDoc(articleRef);
          return from(docSnapshot).pipe(map(result => result.exists() ? result.data() as Article : null));
      }

      getAllArticle (): Observable<Article[]| null> {
        const articleCollectionRef = collection(this.firestore, COLLECTION_NAME.article);
        const articlesQuery = query(articleCollectionRef);
        const docsSnapshot : Promise<QuerySnapshot> = getDocs(articlesQuery);
          return from(docsSnapshot).pipe(
              map(result => {
                  if (result.empty) return [];
                  const articles: Article[] = [];
                  result.docs.forEach( element => articles.push(element.data() as Article))
                  return articles;
              }));
      }

      getWhereArticle (titre : string): Observable<Article[]| null> {
        const articleCollectionRef = collection(this.firestore, COLLECTION_NAME.article);
        const articlesQuery = query(articleCollectionRef, where('titre', '==', titre ));
        const docsSnapshot : Promise<QuerySnapshot> = getDocs(articlesQuery);
          return from(docsSnapshot).pipe(
              map(result => {
                  if (result.empty) return [];
                  const articles: Article[] = [];
                  result.docs.forEach( element => articles.push(element.data() as Article))
                  return articles;
              }));
      }
    
     private  getCollectionReference(collectionName : string ) : CollectionReference {
    
        return collection(this.firestore, collectionName);
      }
  
    

}