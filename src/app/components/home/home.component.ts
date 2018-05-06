import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AddpostService} from '../../services/addpost.service.client';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {stringDistance} from 'codelyzer/util/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _postService: AddpostService, private _firebase: AngularFireDatabase ) {
    }
    // editorContent: string ='answer';
  question: String;
  answer: String;
  tag: String;
  successMessage: Boolean = false;
  successUpdated: Boolean = false;
  posts: AngularFireList<any>;
  editorContent: string;
  editPost: any;

  ngOnInit() {
    this.findAllPosts();
  }

  findAllPosts() {
     return this._postService.findAllPosts()
      .subscribe(
        (data: any) => {
        this.posts = data;
        console.log('posts', this.posts);
        console.log(this.posts[0]._id);
        }
      );
  }


  deletePost(post) {
    console.log(post);
    this._postService.deletePost(post)
     .then(
        (data: any) => {
          this.successMessage = true;
          this.ngOnInit();
        }
      );
  }

  getPost(post) {
    this.editPost = post;
    this.editorContent = this.editPost.answer;
  }

  updatePost(key, question, answer, tag) {
    this.editPost.question = question;
    this.editPost.answer = answer;
    this.editPost.tag = tag;
    console.log('updated post', this.editPost);
    console.log('updated');
    return this._postService.updatePost(this.editPost)
      .then(
        (data: any) => {
          this.successUpdated = true;
          console.log(data);
          this.ngOnInit();
        }
      );
  }
}
