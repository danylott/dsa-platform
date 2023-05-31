# Local nginx
Uses certificates in ./local-ssl

## Add local.dsa.platform to /etc/hosts

- open `/etc/hosts` for editing
    ```bash
    sudo nano /etc/hosts
    ```
- add `local.dsa.platform` near `127.0.0.1`.
    ```nashorn js
    127.0.0.1       localhost
    127.0.0.1       localunixsocket.local
    // add this one
    127.0.0.1       local.dsa.platform
    ```

## Add certificate to trusted
- Add certificate to trusted(Use certificates from `./nginx/local-ssl` )
    - [MacOS](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/)
      - In short - open `Keychain Access` and drag `certificate.crt` from `nginx/local-ssl` to `Certificates` tab.
      - On `Certificates` tab. Find certificate `local.dsa.platform` and double-click on it. In opened window go to `Trust` tab and change `When using this certificate` to `Always Trust`.
    - [Windows](https://community.spiceworks.com/how_to/1839-installing-self-signed-ca-certificate-in-windows)

    - Linux (Ubuntu and ubuntu based distro)
     - Install ca-certificates utility `sudo apt-get install ca-certificates`
     - Add certificate to trusted `sudo cp our_certificate.crt /usr/share/ca-certificates` *For every .crt and .pem certificate*
    - Update certificates `sudo update-ca-certificates` or `sudo dpkg-reconfigure ca-certificates` select `yes` and mark every new certificate

    If you have any problems with certificates in browser add them manually to browser trusted certificates db
    - Install libnss3-tools lib `sudo apt-get install libnss3-tools`
    - Use command `certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n "unique_certificate_name" -i /path/to/certificate.crt` to add certificate to trusted.
      -- Where `unique_certificate_name` use unique name for every certificate.
    - Restart browser

## Misc
- [Download certificate](https://medium.com/@menakajain/export-download-ssl-certificate-from-server-site-url-bcfc41ea46a2)
