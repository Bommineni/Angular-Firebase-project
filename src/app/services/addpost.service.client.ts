import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Addpost} from './addpost.model';
import 'rxjs/Rx';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import {timestamp} from 'rxjs/operator/timestamp';
import {longStackSupport} from 'q';

@Injectable()
 export class AddpostService {
  baseUrl = environment.baseUrl;
  constructor(private _http: Http, private firebase: AngularFireDatabase) {
    this.firebase.list('/posts', ref => ref.orderByChild('datePosted'));
  }


  createPost(question: String, answer: String, tag: String) {
    console.log('cilentdata');
    const postdata = {
      question: question,
      answer: answer,
      tag: tag
    };
    console.log('firebase');
    return this.firebase.list('/posts')
      .push({question: postdata.question, answer: postdata.answer, tag: postdata.tag, datePosted: new Date().toLocaleString()});
  }

  updatePost(editpost) {
    return this.firebase.list('posts/').update(editpost.key, editpost);
   /* return this._http.put(this.baseUrl + '/api/updatepost/' + posts._id, posts)
      .map(
        (res: Response) => {
          return 'updated';
    }
    );*/
  }

  findAllPosts() {
    return this.firebase.list('/posts').snapshotChanges().
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()})).reverse();
      });

   /* return this._http.get(this.baseUrl + '/api/addpost')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );*/
  }

  deletePost(post) {

    return this.firebase.list('posts/' + post.key).remove();
  }
  }
