import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CharacterService } from "./character.service";

@Injectable({
    providedIn: "root"
})
export class CharacterResolver implements Resolve<void> {
    constructor(private characterService: CharacterService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const characterFile = route.paramMap.get('character-file');
        if (characterFile) {
          const characterJson = await import('../assets/'+characterFile+'.json');
          this.characterService.loadCharacter(characterJson.default);
        }
    }
}