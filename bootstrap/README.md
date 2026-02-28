<!-- # BlueOS-Bootstrap -->

# CoratiaOS-Bootstrap

<!-- Bootstrap is responsible for setting things up for the first run of BlueOS and applying docker bind updates. -->

Bootstrap is responsible for setting things up for the first run of CoratiaOS and applying docker bind updates.

<!-- ### Running BlueOS -->

### Running CoratiaOS

<!-- If you want to run BlueOS, please check the [install script](../install/README.md) or [docker compose](../README.md). -->

If you want to run CoratiaOS, please check the [install script](../install/README.md) or [docker compose](../README.md).

### Build:

You can run the following command to build it:

<!-- ===== Changed the image ===== -->

```bash
cd bootstrap
docker build . --tag coratia/coratiaos-bootstrap:master
```

### Usage:

Everytime it is launched, it will load the startup settings, wait until the core container is not running, and re-create and re-launch it.

<!-- ===== Changed the image ===== -->

```bash
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v /config:/config  coratia/coratiaos-bootstrap:master
```

<!-- This will automatically populate /config if there is no valid config file in there, fetch if necessary, and then launch BlueOS. -->

This will automatically populate /config if there is no valid config file in there, fetch if necessary, and then launch CoratiaOS.
