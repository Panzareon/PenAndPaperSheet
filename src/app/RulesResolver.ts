import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RulesService } from "./rules.service";
import { HttpClient } from "@angular/common/http";
import { Rules } from './rules';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: "root"
})
export class RulesResolver implements Resolve<void> {
    constructor(
        private rulesService: RulesService,
        private http: HttpClient,
        @Inject(APP_BASE_HREF) private baseHref: string) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const rulesFile = route.queryParamMap.get("rules");
        if (rulesFile) {
            const headers = {
                'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            };
            const rulesJson = await this.http.get<Rules>(this.baseHref+'assets/rules/'+rulesFile+'.json', {headers:headers}).toPromise();
            this.rulesService.loadRules(rulesJson);
        }
    }
}