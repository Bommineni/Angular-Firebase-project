import {Component, OnInit, ViewChild} from '@angular/core';
import {AddpostService} from '../../services/addpost.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  public editorValue: String = '';

  @ViewChild('f') postForm: NgForm;

  constructor(private router: Router, private _postService: AddpostService) { }
  alertMessage: Boolean = false;
  successMessage: Boolean = false;
  question: String;
  answer: String;
  tag: String;
  posts: any;

  ngOnInit() {
    $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        alert('Hello!');
      }
    });
  }

  createPost() {
    this.question = this.postForm.value.question;
    this.answer = this.postForm.value.answer;
    this.tag = this.postForm.value.tag;

    console.log('data', this.question);

    return this._postService.createPost(this.question, this.answer, this.tag)
      .then(
        (data: any) => {
          this.successMessage = true;
          this.ngOnInit();
          this.question = null;
          this.answer = null;
          this.tag = null;
        }
      );
  }


}
