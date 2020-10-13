import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  redirectLink = 'https://discord.com/api/oauth2/authorize?client_id=681180203292164128&redirect_uri=http%3A%2F%2Flocalhost%3A4200&response_type=token&scope=identify%20email%20guilds';

  constructor(private route: ActivatedRoute) { }

  username: string;
  verified: string;
  guilds: string[];

  ngOnInit(): void {
    this.route.fragment.subscribe((fragments: string) => {
      const fragment = new URLSearchParams(window.location.hash.slice(1));

      if (fragment.has('access_token')) {
        const accessToken = fragment.get('access_token');
        const tokenType = fragment.get('token_type');

        fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${tokenType} ${accessToken}`
          }
        }).then(res => res.json())
          .then(response => {
            const { username, discriminator, verified } = response;
            this.username = ` ${username}#${discriminator}`;
            this.verified = `${verified}`;
          });
        fetch('https://discord.com/api/users/@me/guilds', {
          headers: {
            authorization: `${tokenType} ${accessToken}`
          }
        }).then(res => res.json())
          .then(response => {
            const { name } = response;
            name.forEach(g =>{this.guilds})
          });
    }});
  }

}
