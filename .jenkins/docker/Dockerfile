FROM jenkins/core/there

USER 0

COPY ./contrib/jenkins/configuration $JENKINS_REF_HOME

RUN set -x && \
    chgrp -R 0 $JENKINS_REF_HOME && \
    chmod -R 644 $JENKINS_REF_HOME && \
    chmod -R g+rwX $JENKINS_REF_HOME

RUN INSTALL_DEPENDENCIES="libXScrnSaver libappindicator-gtk3 GConf2 liberation-fonts wget xdg-utils gdk-pixbuf2 xorg-x11-server-Xvfb firefox" && \
    curl -sSLO https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm && \
    microdnf update --enablerepo=rhel-7-server-rpms glib2 && \
    microdnf install --enablerepo=rhel-7-server-rpms --enablerepo=rhel-7-server-optional-rpms $INSTALL_DEPENDENCIES && \
    rpm -ivh google-chrome-stable_current_x86_64.rpm

USER 1001

