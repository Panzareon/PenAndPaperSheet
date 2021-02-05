import { Injectable, Inject, DebugElement } from '@angular/core';
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
            const headers = {
                'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            };
            const characterJson = await this.http.get<Character>(this.baseHref+'assets/character/'+characterFile+'.json', {headers:headers}).toPromise();
            let characterIndex = this.characterService.loadCharacter(characterJson);
            this.characterService.selectCharacter(characterIndex);
        }
        const character = route.paramMap.get('char');
        if (character)
        {
            this.characterService.selectCharacter(Number(character));
        }
        else
        {
            this.characterService.selectCharacter(0);
        }
    }
}