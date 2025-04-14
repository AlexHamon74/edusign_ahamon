<?php

namespace App\Controller;

use App\Entity\Eleve;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

final class SignPresenceController extends AbstractController {

    public function __invoke(int $id, EntityManagerInterface $em): JsonResponse
    {
        $eleve = $em->getRepository(Eleve::class)->find($id);

        if (!$eleve) {
            return new JsonResponse(['message' => 'Élève non trouvé'], 404);
        }

        $eleve->setStatut('présent');
        $em->flush();

        return new JsonResponse([
            'message' => 'Présence enregistrée',
            'eleve' => $eleve->getNom(),
            'statut' => $eleve->getStatut()
        ]);
    }

}