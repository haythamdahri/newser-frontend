import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            loadChildren: './home/home.module#HomePageModule'
        },
        {
            path: 'contact',
            loadChildren: './contact/contact.module#ContactPageModule'
        },
        {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfilePageModule'
        },
        {
            path: 'posts',
            children: [
                {
                    path: '',
                    loadChildren: './posts/posts.module#PostsPageModule',
                },
                {
                    path: 'save',
                    loadChildren: './post-edit/post-edit.module#PostEditPageModule'
                },
                {
                    path: 'save/:id',
                    loadChildren: './post-edit/post-edit.module#PostEditPageModule'
                }
            ]
        }
    ]
;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
