import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CharacterService } from "./character.service";
import { HttpClient } from "@angular/common/http";
import { Character } from './character';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: "root"
})
export class CharacterResolver implements Resolve<void> {
    constructor(
        private characterService: CharacterService,
        private http: HttpClient,
        @Inject(APP_BASE_HREF) private baseHref: string) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const characterFile = route.paramMap.get('character-file');
        if (characterFile) {
          const characterJson = await this.http.get<Character>(this.baseHref+'assets/'+characterFile+'.json').toPromise();
          this.characterService.loadCharacter(characterJson);
        }
    }
}