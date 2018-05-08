import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Article } from '../article';
import { slideInDownAnimation } from '../animations';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RestService } from '../rest.service';
import { switchMap } from 'rxjs/operators';
import { Observable }             from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less'],
  animations: [ slideInDownAnimation ]
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  article$: Observable<Article>;
  isEdit = false;
  articleName = '';
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RestService
  ) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getData('articles/' + params.get('id'))
      )
    );
  }

  onEdit() {
    this.isEdit = true;
  }
  
}
