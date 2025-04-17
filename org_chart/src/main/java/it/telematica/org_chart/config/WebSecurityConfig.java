package it.telematica.org_chart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
// contiene vari bean per configurazione della sicurezza web, ad esempio password encoder, security filter chain, ecc (anche cose non inserite in questo file)
public class WebSecurityConfig {

    // configura il lato della sicurezza dell'http e quindi anche il controllo degli accessi per determinati url
    @Bean
    public SecurityFilterChain springSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // disabilita la protezione CSRF (Cross-Site Request Forgery), nel nostro caso perchè utilizzeremo i jwt come token di autenticazione
                .authorizeHttpRequests((request) -> request
                                .requestMatchers("/","/home").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login").permitAll()
                ).logout(LogoutConfigurer::permitAll);

        return http.build();
    }

    // con questo metodo creiamo in memoria locale degli utenti, per non andare a prenderli da un database
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
                .username("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    // serve per dare un tipo di encoding esterno a spring per la password, che possiamo decidere noi
    // ad esempio noi utilizziamo BCryptPasswordEncoder che è il più usato attualmente
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
