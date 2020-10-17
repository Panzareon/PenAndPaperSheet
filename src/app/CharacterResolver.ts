import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CharacterService } from "./character.service";
import { HttpClient } from "@angular/common/http";
import { Character } from './character';

@Injectable({
    providedIn: "root"
})
export class CharacterResolver implements Resolve<void> {
    constructor(private characterService: CharacterService, private http: HttpClient) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const characterFile = route.paramMap.get('character-file');
        if (characterFile) {
          const characterJson = await this.http.get<Character>('../assets/'+characterFile+'.json').toPromise();
          this.characterService.loadCharacter(characterJson);
        }
    }
}