job "valkey-cache" {
  datacenters = ["dc1"]
  type        = "service"

  group "cache-group" {
    count = 1
    network {
      port "db" { static = 6379 }
    }

    task "valkey" {
      driver = "docker"
      config {
        image = "valkey/valkey:8.0-alpine"
        ports = ["db"]
        args = [
          "--maxmemory", "4gb",
          "--maxmemory-policy", "allkeys-lru",
          "--databases", "16",
          "--loglevel", "warning"
        ]
      }
      resources {
        cpu    = 2000
        memory = 4096
      }
      service {
        name = "valkey-cache"
        port = "db"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }
  }
}
