import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = null;
  selectedArticle: Article = null;
  articleName = '';
  constructor(
    private restService: RestService,
    
  ) { }

  ngOnInit() {
    this.getArticleList();
  }
  
  getArticleList() {
    console.log('get');
    return this.restService.getData('articles').subscribe(
      data => {
        this.articles = data;
      }
    )
  }

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

  deleteArticle(id) {
    const url  = `articles/${id}`;
    this.restService.deleteData(url).subscribe(
      data => {
        this.articles = this.articles.filter(article =>{
          console.log(article, article.id, article.id !== id);
          return article.id !== id;
        });
      }
    )
  }

  onSelect(article: Article) {
    console.log(111, article);
    this.selectedArticle = article;
  }

}
