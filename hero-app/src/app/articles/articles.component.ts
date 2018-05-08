import { Component, OnInit, HostBinding } from '@angular/core';
import { Article } from '../article';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less'],
  animations: [ slideInDownAnimation ]
  
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = null;
  selectedArticle: Article = null;
  articleName = '';

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getArticleList();
  }
  getArticleList() {
    this.route.data
    .subscribe((data) => {
      this.articles = data.data;
    });
  }
  
  // getArticleList() {
  //   console.log('get');
  //   return this.restService.getData('articles').subscribe(
  //     data => {
  //       this.articles = data;
  //     }
  //   )
  // }

  addArticle() {
    if (this.articleName === '') {
      return;
    }
    this.restService.addData('articles', { name: this.articleName }).subscribe(
      data => {
        this.articles.push(data)
        this.articleName = '';
      });
    
  }

  deleteArticle($event, id) {
    $event.stopPropagation();
    const url  = `articles/${id}`;
    this.restService.deleteData(url).subscribe(
      data => {
        this.articles = this.articles.filter(article =>{
          console.log(article, article.id, article.id !== id);
          return article.id !== id;
        });
      }
    )
    return false;
  }

  onSelect(article: Article) {
    console.log(111, article);
    this.selectedArticle = article;
  }

}
