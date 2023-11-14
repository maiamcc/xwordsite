# syntax=docker/dockerfile:1.6.0-labs -*- dockerfile-image-name: "xwordsite" -*-

### Dockerfile --

## Copyright (C) 2023 Zachary Elliott <contact(at)zell.io>

### Commentary:

##

### Code:

ARG debian_version="slim-bookworm"
ARG ruby_version="3.1.4"

FROM ruby:${ruby_version}-${debian_version} AS source

ENV \
    TERM=xterm \
    DEBIAN_FRONTEND=noninteractive


FROM source AS site-source

RUN apt-get update
RUN apt-get install --yes --no-install-recommends gcc g++ make

ADD Gemfile Gemfile.lock /build/

WORKDIR /build

RUN /bin/bash <<'eof'
set -eu -o pipefail -x
bundle config set --local path 'vendor/bundle'
bundle install
eof

ADD . /build/

RUN bundle exec jekyll build


FROM source AS linux-source

RUN apt-get update
RUN apt-get install --yes lighttpd netcat-openbsd jq

RUN /usr/share/lighttpd/create-mime.conf.pl >/etc/lighttpd/mimetypes.conf

RUN /bin/bash <<'EOF'
set -eu -o pipefail

declare -a files=(
    '/etc/lighttpd/mimetypes.conf'
    '/etc/nsswitch.conf'
    '/etc/ssl/certs/ca-certificates.crt'
    '/etc/timezone'
    '/usr/share/zoneinfo/Etc/UTC'
)

declare -a mods=(
    'accesslog'
    'dirlisting'
    'status'
)

declare mod
for mod in "${mods[@]}"; do
    files+=("/usr/lib/lighttpd/mod_${mod}.so")
done

declare -a bins=(
    'bash'
    'jq'
    'lighttpd'
    'netcat'
    'tr'
)

declare bin
declare -a bin_libs=()
for bin in "${bins[@]}"; do
    bin="$(command -v "$bin")"
    readarray -t -d$'\n' bin_libs < <(ldd "$bin" | grep -o '/[^ ]\+')
    files+=("$bin" "${bin_libs[@]}")
done

declare file real_path mode
for file in "${files[@]}"; do
    real_path="$(readlink --canonicalize "$file")"
    mode="$(stat --format='%a' "$real_path")"
    test "${#mode}" -lt 4 && mode="0${mode}"
    install --verbose --mode="$mode" -D "$file" /image-root"$file"
done

declare -a dirs=(
    '/image-root/var/run/lighttpd'
    '/image-root/var/log/lighttpd'
    '/image-root/var/tmp/lighttp'
)

mkdir -p "${dirs[@]}"
chown 65533:65533 "${dirs[@]}"
EOF


FROM scratch AS image

COPY --from=site-source /build/_site /srv/http
COPY --from=linux-source /image-root/ /

ADD container/root /

ENTRYPOINT ["/usr/sbin/lighttpd"]
CMD ["-f", "/etc/lighttpd/lighttpd.conf", "-D"]
