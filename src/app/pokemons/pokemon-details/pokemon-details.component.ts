import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { TrainerService } from '../trainer-service/trainer.service';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../services/pokemon.service';
import { AuthService } from '../auth-service/auth.service';
import { Credential } from '..//models/credential.model';
import { ActivatedRoute } from "@angular/router";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


import { Location } from '@angular/common'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  cred: Credential = {
    email: environment.mail,
    password: environment.mdp
  };

  pokemon?: Pokemon;
  isInTeam: boolean = false;
  canAdd: boolean = true;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private trainerService: TrainerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.login(this.cred).subscribe(data => { 
      this.authService.setToken(data);
      this.trainerService.getTeam().subscribe(data => { 
        this.trainerService.teamIds = data;
        if(data.length == 6)
          this.canAdd = false;
        if(this.actRoute.snapshot.paramMap.get('id') && Number(this.actRoute.snapshot.paramMap.get('id')) > 0 && Number(this.actRoute.snapshot.paramMap.get('id')) < 152)
        this.pokemonService.getPokemonById(Number(this.actRoute.snapshot.paramMap.get('id'))).subscribe(data => {
          this.pokemon = data;
          if(this.trainerService.teamIds.includes(this.pokemon.id || -1))
          {
            this.isInTeam = true;
          }
          else
            this.isInTeam = false;
          this.playSound(this.pokemon.id?.toString() || "");
        });
      
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if(Number(event.url.replace(/\D/g,'')) > 0 && Number(event.url.replace(/\D/g,'')) < 152)
            this.pokemonService.getPokemonById(Number(event.url.replace(/\D/g,''))).subscribe(data => {
              this.pokemon = data;         
              if(this.trainerService.teamIds.includes(this.pokemon.id || -1))
              {
                this.isInTeam = true;
              }
              else
                this.isInTeam = false;
                this.playSound(this.pokemon.id?.toString() || "");});
      }})
      }); 
    });
  }

  playSound(son: String | undefined){
    let audio = new Audio();
    audio.src = "assets/audio/" + son + ".mp3";
    audio.load();
    var resp = audio.play();

    if (resp!== undefined) { //Allows to not log the error
      resp.then(_ => {
          // autoplay starts!
      }).catch(error => {
         //show error
      });
    }
  }

  addPokemonToTeam(){
    if(this.pokemon)
    {
      if(this.trainerService.teamIds.length < 6)
      {
        this.playSound("catch");
        if(this.trainerService.teamIds.length + 1 == 6)
          this.canAdd = false;
        else
          this.canAdd = true;
        this.trainerService.addPokemonToTeam(this.pokemon.id || -1)
        this.isInTeam = true;
      }
    }
  }

  removePokemonFromTeam(){
    if(this.pokemon)
    {
      let count = 0;
      this.trainerService.removePokemonFromTeam(this.pokemon.id || -1)

      for (var i = 0; i < this.trainerService.teamIds.length; i++) 
      {
        if(this.trainerService.teamIds[i] == this.pokemon.id)
          count++;
      }
      if(count == 0)
        this.isInTeam = false;

      this.canAdd = true;
      this.playSound("release");
    }
  }

  goBack(){
  	this.location.back();
  }

}
