import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditPage } from './post-edit.page';

describe('PostEditPage', () => {
  let component: PostEditPage;
  let fixture: ComponentFixture<PostEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
